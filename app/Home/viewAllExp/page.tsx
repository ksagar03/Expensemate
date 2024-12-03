"use client";
import { fetchExpenses } from "@/app/lib/axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Expense } from "@/app/models/userModel";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import { updateExpenses, deleteExpense } from "@/app/lib/axios";
import CategoriesSearchBar from "@/app/Components/CategoriesSearchBar";

export interface ExpenseDataDef extends Expense {
  timestamp: string;
  _id: string;
}

const Page = () => {
  const [searchedData, setSearchedData] = useState("");
  const [fetchedExp, setFetchedExp] = useState<ExpenseDataDef[]>([]);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { data: session, status } = useSession();
  const [formData, setFromData] = useState({
    category: "",
    amount_spent: 0,
    description: "",
    _id: "",
  });
  const [isExpenseAdded, setIsExpenseAdded] = useState(false);

  useEffect(() => {
    if (isExpenseAdded) {
      setIsExpenseAdded(false);
    }
  }, [isExpenseAdded]);
  // useEffect(() => {
  //   console.log("Updated form data:", formData);
  // }, [formData]);

  const searchedCategory = (data: string) => {
    console.log("view all exp", data);
    setSearchedData(data);
  };
  const handleSearchBarerror = (searchbar_error: string) => {
    if (searchbar_error) {
      console.log("search bar error message: ", searchbar_error);
      setError(searchbar_error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExpenseAdded(true);
    setFromData((prevData) => ({ ...prevData, category: searchedData }));
    console.log("form submitted", formData);

    setIsEdit(false);
  };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFromData((prev) => ({ ...prev, [name]: value }));
  };

  // Only fetch data when the session is authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const userID = session.user._id ?? "";
      // console.log(userID);
      const fetchData = async () => {
        try {
          const data = await fetchExpenses(userID);
          // console.log("fetchedData", data.expenses);
          setFetchedExp(data.expenses);
        } catch (error) {
          setError(`Error occurred while fetching the data: ${error}`);
        }
      };
      fetchData();
    }
  }, []);

  // Show loading or error message while waiting for session data or fetching expenses
  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Use dummy data if session is not authenticated or no expenses are fetched

  return (
    <>
      <div className="p-6 mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          User Expenses
        </h2>

        {/* Grid layout for expenses */}
        <div className="grid grid-cols-1 gap-6">
          {fetchedExp.map((expense) => (
            <div
              key={expense._id}
              className="bg-white p-5  relative rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <span className="absolute flex right-[1rem] gap-2 ">
                <span
                  onClick={() => {
                    setFromData({
                      category: expense.category,
                      amount_spent: expense.amount_spent,
                      description: expense.description
                        ? expense.description
                        : "",
                      _id: expense._id,
                    });
                    setIsEdit(true);
                  }}
                >
                  <DriveFileRenameOutlineIcon className="cursor-pointer hover:text-blue-600" />
                </span>
                <span>
                  <DeleteOutlineIcon className=" cursor-pointer hover:text-red-600 " />
                </span>
              </span>
              <h1 className="text-lg font-medium text-gray-700">
                {expense.category}
              </h1>
              <p className="text-gray-500 text-sm">{expense.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-semibold text-green-600">
                  ₹{expense.amount_spent.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(expense.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* <UpdateExpenses/> */}
      </div>
      {isEdit && (
        <div className=" fixed flex inset-0 bg-dark bg-opacity-50 items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, x: -50, y: -50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: 50 }}
            className="bg-light rounded-lg shadow-lg w-96 p-6"
          >
            <h2 className="text-xl font-bold mb-4"> Edit Expense</h2>
            <label
              htmlFor="Category"
              className="block text-gray-700 font-medium"
            >
              Category<span className="text-red-600">*</span>
            </label>
            <CategoriesSearchBar
              UpdatedCategoryEdit={formData.category}
              currentCategory={searchedCategory}
              searchBarErrrmsg={handleSearchBarerror}
              isExpenseAdded={isExpenseAdded}
            />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                {/* <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleOnChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 z-20"
                  required
                /> */}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Amount Spent<span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="amount_spent"
                  value={formData.amount_spent}
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
                  value={formData.description}
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
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Page;
