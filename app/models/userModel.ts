"use server";

import { Category } from "@mui/icons-material";
import mongoose from "mongoose";

// interface objecttypes {
//     type: string
// }

const userSchema = new mongoose.Schema({
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
