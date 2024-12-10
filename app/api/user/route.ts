"use server";
import { NextResponse } from "next/server";
import User from "../../models/userModel";

interface UserRequest {
  email: string;
  action: string;
  name: string;
  password: string;
}

export async function POST(request: Request) {
  const { action, name, email, password }: UserRequest = await request.json();
  try {
    if (action === "find" && email) {
      const user = await User.findOne({ email });
      if (user) {
        return NextResponse.json(user);
      } 
      // else {return NextResponse.json({message: "null"}) }
    } else if (action === "create" && name && email && password) {
      await User.create({
        name,
        email,
        password,
      });
      return NextResponse.json(
        { message: "User has been created " },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid action or missing parameters" },
        { status: 400 }
      );
    }
  } catch (err) {
    NextResponse.json(
      { message: "server error", err: (err as Error).message },
      { status: 500 }
    );
  }
}
