"use server";

import { Category } from "@mui/icons-material";
import mongoose from "mongoose";

// interface objecttypes {
//     type: string
// }
export interface Expense {
  category: string;
  amount_spent: number;
  description?: string;
  timestamp?:number
}

export interface User_interface extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  user_expenses: mongoose.Types.DocumentArray<Expense>; // used this as in the mongoose it attaches each id to the newly created object and if we try to access that id the typescript throws error .
}

const userSchema: mongoose.Schema<User_interface> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  // isVerfied: {
  //   type: Boolean,
  //   default: false,
  // }, // will be implemeted in future (time 48:00)
  // forgotPasswordToken: String,
  // forgotPasswordTokenExpiry: Date,
  // verifyToken: String,
  // verifyTokenExpiry: Date,
  user_expenses: [
    {
      category: {
        type: String,
        required: [true, "Please provide a category for the expense"],
      },
      amount_spent: {
        type: Number,
        required: [true, "Please provide the amount spent"],
      },
      description: {
        type: String,
        required: [false, "Please provide a description for the expense"],
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
