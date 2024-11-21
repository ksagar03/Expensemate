"use server";

import { Category } from "@mui/icons-material";
import mongoose from "mongoose";

// interface objecttypes {
//     type: string
// }
interface Expense {
  category: string;
  amount_spent: number;
  description?: string;
}

export interface User_interface extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  user_expenses: Expense[];
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
    },
  ],
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
