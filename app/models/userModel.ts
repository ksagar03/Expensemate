import mongoose from "mongoose";

// interface objecttypes {
//     type: string
// }

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a name/username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a email"],
  },
  // isVerfied: {
  //   type: Boolean,
  //   default: false,
  // }, // will be implemeted in future (time 48:00)
  // forgotPasswordToken: String,
  // forgotPasswordTokenExpiry: Date,
  // verifyToken: String,
  // verifyTokenExpiry: Date,

});

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User
