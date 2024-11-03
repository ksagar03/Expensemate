import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {compare} from "bcryptjs";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await User.findOne({
            email: credentials.email
            // $or: [
            //   { email: credentials.identifier },
            //   { username: credentials.identifier },
            // ],
            // $or is provided by the Mongoodb some time user might have logged in via mail or a username so for  making it future proof i'm using this $or to search  both the email and username(which ever might be available)
          });
          // console.log(user)
          if (!user) {
            // return NextResponse.json({message:"no user"})
            // return "User not found"
            // console.log("no user")
            throw new Error("no user");
            // return null
          }
          // if (!user.isVerified) {
          //   throw new Error("Please verify your account");
          // }
          const isPasswordCorrect = await compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            // console.log("incorrect");
            throw new Error("InCorrect Passowrd");
            return null
            // return "Incorrect Password"
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  //   I want use the Custom page for showcasing the SignIN and SignOut Pages
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.name = token.name;
        // session.user.isVerified = token.isVerified
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.name = user.name;
        // token.isVerified = user.isVerified;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/Home/login",
    // signUp: "/Home/sign-up",
  },
};
