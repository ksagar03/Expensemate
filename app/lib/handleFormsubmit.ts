import { authOptions } from "../api/auth/[...nextauth]/options";
import User from "../models/userModel";
import { hash } from "bcryptjs";
import dbConnect from "./dbConnect";
import { redirect } from "next/dist/server/api-utils";
import { signIn } from "next-auth/react";


export const handleSignUpSubmit = async (formData: FormData) => {
    
  const name = formData.get("name") as string | undefined;
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string;
  console.log(email)
  console.log(name)
  console.log(password)
  
  if(!name || !email || !password){
    throw new Error("Please Provide all the fields")
  }
  await dbConnect()
  const user = await User.findOne({ email });



  if (user) {
    throw new Error("User Already exist");
  } else {
    const hashed = await hash(password, 10);
    await User.create({
      name,
      email,
      password: hashed,
    });
  }
//   redirect // need to decide this
};


export const handleLoginSubmit = async (formData:FormData) => {

    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string;

    if(!email || !password) {
        throw new Error("Please provide all fields")
    }

    try {
        await signIn('credentials', {
          email,
          password,
        })
    } catch{

    }

   

}


