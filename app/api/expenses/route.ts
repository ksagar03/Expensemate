"use server";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/userModel";

interface expenseData {
  userID: string;
  category: string;
  amount_spent: number;
  description?: string;
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
export async function  GET (req: NextRequest){
    const userID = req.nextUrl.searchParams.get("userID") || "";
}
