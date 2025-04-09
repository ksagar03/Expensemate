"use server";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import User, { Expense, User_interface } from "../../models/userModel";
import redisClient, {
  setCachedExpense,
  getCachedExpense,
  invalidateData,
} from "@/app/lib/redisconf";
import { ExpenseDataDef } from "@/app/Home/viewAllExp/page";
import { updateExpenses } from "@/app/lib/axios";

// import lruCache from "@/app/lib/lruCache";

export interface expenseData {
  userID: string;
  category: string;
  amount_spent: number;
  description?: string;
}

export interface expenseIdData extends expenseData {
  expenseID: string;
}

export async function POST(req: NextRequest) {
  try {
    const { userID, category, amount_spent, description }: expenseData =
      await req.json();
    await dbConnect();

    const user = await User.findById(userID);
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    user.user_expenses.push({ category, amount_spent, description });
    await user.save();

    const LastExpID =
      user.user_expenses[user.user_expenses.length - 1]._id.toString();

    // Lru cache

    // let cachedExp = lruCache.get(`expenses:${userID}`) || [];

    // cachedExp = [
    //   ...cachedExp,
    //   {
    //     category,
    //     amount_spent,
    //     description,
    //     timestamp: Date.now(),
    //     _id: LastExpID,
    //   },
    // ];

    // lruCache.set(`expenses:${userID}`, cachedExp);

    // redis post method
    // method 1
    // await setCachedExpense(userID, LastExpID, {
    //   category,
    //   amount_spent,
    //   description,
    //   timestamp: Date.now(),
    // });
    // console.log("last exp: ",LastExpID)

    //  redis post method
    // method 2
    try {
      let cached = await getCachedExpense(userID);
      let updatedExpenses: ExpenseDataDef[] = [];
      if (cached && Array.isArray(cached)) {
        updatedExpenses = [
          ...cached,
          {
            category,
            amount_spent,
            description,
            timestamp: Date.now(),
            _id: LastExpID,
          },
        ];
      } else {
        updatedExpenses = [
          {
            category,
            amount_spent,
            description,
            timestamp: Date.now(),
            _id: LastExpID,
          },
        ];
      }
      await setCachedExpense(userID, updatedExpenses);
    } catch (error) {
      console.error("Redis add new expense error", error);
    }

    return NextResponse.json(
      { message: "Expense added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to add expense: ${error}` },
      { status: 500 }
    );
  }
}

//  Get request ------------
export async function GET(req: NextRequest) {
  const userID = req.nextUrl.searchParams.get("userID") || "";

  // lru cache
  // const cachedExp = lruCache.get(`expenses:${userID}`);
  // if (cachedExp) {
  //   console.log("fetched from lru cache");
  //   return NextResponse.json({ expenses: cachedExp });
  // }
  try {
    // redis get method 1
    const cachedExp = await getCachedExpense(userID);
    if (cachedExp) {
      console.log("returning from cached data");
      return NextResponse.json({ expenses: cachedExp });
    }

    await dbConnect();
    const user = await User.findById(userID);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // redis set method 1
    // await Promise.all(
    //   user.user_expenses.map((exp: ExpenseDataDef) => {
    //     setCachedExpense(userID, exp._id.toString(), exp);
    //   })
    // );
    // console.log("data fetchedd from DB and cached to redis");

    //  redis method 2
    try {
      await setCachedExpense(userID, user.user_expenses);
    } catch (error) {
      console.error("error while pushing data to redis", error);
    }
    //----- lru set
    // lruCache.set(`expenses:${userID}`, user.user_expenses);

    return NextResponse.json({ expenses: user.user_expenses });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to Fetch the expenses: ${error}` },
      { status: 500 }
    );
  }
}

// Put request ------------
export async function PUT(req: NextRequest) {
  try {
    const {
      userID,
      expenseID,
      category,
      amount_spent,
      description,
    }: expenseIdData = await req.json();
    await dbConnect();
    const user = (await User.findById(userID)) as User_interface | null;

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const expense = user.user_expenses.id(expenseID);

    if (!expense) {
      return NextResponse.json(
        { message: "Expense not found" },
        { status: 404 }
      );
    }
    expense.category = category || expense.category;
    expense.amount_spent = amount_spent || expense.amount_spent;
    expense.description = description || expense.description;
    expense.timestamp = Date.now();

    await user.save();

    //  redis PUT method 1
    // await setCachedExpense(userID, expenseID, expense);

    //  redis method 2
    try {
      let cached = await getCachedExpense(userID);
      if (!cached) return;
      const cachedExp = cached as ExpenseDataDef[]
      const updatedExpenses = cachedExp.map((exp: ExpenseDataDef) =>
        exp._id === expense._id.toString() ? expense : exp
      );
      await setCachedExpense(userID, updatedExpenses);
    } catch (error) {
      console.error("failed to edit data in redis", error);
    }

    //  lru put
    // let cachedExp = lruCache.get(`expenses:${userID}`) || [];
    // console.log("cache length ------",cachedExp.length)
    // cachedExp = cachedExp.map((exp) =>
    //   exp._id.toString() === expenseID.toString()
    //     ? {
    //         ...exp,
    //         category: category || exp.category,
    //         amount_spent: amount_spent || exp.amount_spent,
    //         description: description || exp.description,
    //         timestamp: Date.now(),
    //       }
    //     : exp
    // );
    // lruCache.set(`expenses:${userID}`, cachedExp);
    return NextResponse.json(
      { message: "Expense updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `failed to update expense: ${error}` },
      { status: 500 }
    );
  }
}

//  Delete request ------------

export async function DELETE(req: NextRequest) {
  try {
    const { userID, expenseID }: expenseIdData = await req.json();
    await dbConnect();
    const user = (await User.findById(userID)) as User_interface | null;
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    user.user_expenses.pull(expenseID);
    await user.save();

    //  Redis delete
    await invalidateData(userID);
    // let cachedExp = lruCache.get(`expenses:${userID}`) || [];
    // cachedExp = cachedExp.filter((exp) => exp._id !== expenseID);
    // lruCache.set(`expense:${userID}`, cachedExp);

    return NextResponse.json(
      { message: "Expense deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `failed to delete expense: ${error}` },
      { status: 500 }
    );
  }
}
