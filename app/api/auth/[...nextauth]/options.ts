import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
// import bcrypt from "bcryptjs"
import { promises } from "dns";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",

            credentials: {
                email: { label: "Username", type: "text "},
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any):Promise<any>{

            }

        })
    ]
}


