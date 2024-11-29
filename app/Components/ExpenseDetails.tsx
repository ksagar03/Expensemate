import { Expense } from "../models/userModel";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import { motion } from "framer-motion";

export interface ExpenseDataDef extends Expense {
  timestamp: string;
}

export const UpdateExpenses = (): React.ReactNode => {
  const handleSubmit = () => {};
  const handleOnChange = () => {};
  return (
    <div className=" fixed flex inset-0 bg-dark bg-opacity-50 items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-light rounded-lg shadow-lg w-96 p-6"
      >
        <h2 className="text-xl font-bold mb-4"> Edit Expense</h2>
        <form action="onsubmit" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="Category"
              className="block text-gray-700 font-medium"
            >
              Category<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={"abc"}
              onChange={handleOnChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Amount Spent<span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="amount_spent"
              value={0}
              onChange={handleOnChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={"abc"}
              onChange={handleOnChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-light rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export const ExpenseDetails = ({
  category,
  amount_spent,
  description,
  timestamp,
}: ExpenseDataDef) => {
  return (
    <div className="bg-white p-5  relative rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <span className="absolute flex right-[1rem] gap-2 ">
        <DriveFileRenameOutlineIcon className="cursor-pointer hover:text-blue-600" />
        <DeleteOutlineIcon className=" cursor-pointer hover:text-red-600 " />
      </span>
      <h1 className="text-lg font-medium text-gray-700">{category}</h1>
      <p className="text-gray-500 text-sm">{description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-semibold text-green-600">
          ₹{amount_spent.toFixed(2)}
        </span>
        <span className="text-sm text-gray-400">
          {new Date(timestamp).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
