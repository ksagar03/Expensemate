"use server";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User, { User_interface } from "@/app/models/userModel";

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
export async function GET(req: NextRequest) {
  const userID = req.nextUrl.searchParams.get("userID") || "";
  try {
    await dbConnect();
    const user = await User.findById(userID);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ expenses: user.user_expenses });
  } catch (error) {
    NextResponse.json(
      { message: `Failed to Fetch the expenses: ${error}` },
      { status: 500 }
    );
  }
}

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

    return NextResponse.json(
      { message: `Expense updated successfully: ${user} ` },
      { status: 201 }
    );
  } catch (error) {
    NextResponse.json(
      { message: `failed to update expense: ${error}` },
      { status: 500 }
    );
  }
}

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

    return NextResponse.json(
      { message: `Expense deleted successfully: ${user} ` },
      { status: 201 }
    );
  } catch (error) {
    NextResponse.json(
      { message: `failed to delete expense: ${error}` },
      { status: 500 }
    );
  }
}
