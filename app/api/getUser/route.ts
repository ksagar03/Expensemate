import { NextResponse } from "next/server";
import User from "@/app/models/userModel";

interface UserRequest {
    email: string;
}

export async function POST(request: Request) {
    const {email}: UserRequest = await request.json();
    try {
        const user =  await User.findOne({email})
        if(user){
            return NextResponse.json(user)
        }else{
            return NextResponse.json({message:"user not found"})
        }
    } catch (err){NextResponse.json({message:"server error", err: (err as Error).message}, {status: 500})}
}