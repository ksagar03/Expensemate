"use server";

import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  category: {
    type:[String],
    required: [true, "Please provide categories"],
    unique: true
  },
});

const Categories =
  mongoose.models.categories || mongoose.model("categories", categoriesSchema);

  export default Categories
