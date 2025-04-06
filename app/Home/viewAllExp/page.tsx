"use client";
import { debounce, fetchExpenses } from "@/app/lib/axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { easeInOut, motion } from "framer-motion";
import { Expense } from "@/app/models/userModel";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import { updateExpenses, deleteExpense } from "@/app/lib/axios";
import CategoriesSearchBar from "@/app/Components/CategoriesSearchBar";
import Link from "next/link";
import PopupNotification from "@/app/Components/PopupNotification";

export interface ExpenseDataDef extends Expense {
  _id: string;
}

const Page = () => {
  const [searchedData, setSearchedData] = useState("");
  const [fetchedExp, setFetchedExp] = useState<ExpenseDataDef[]>([]);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { data: session, status } = useSession();
  const userID = session?.user._id ?? "";
  const [refreshRequired, SetRefreshRequired] = useState(false);
  const [formData, setFromData] = useState({
    category: "",
    amount_spent: 0,
    description: "",
    _id: "",
  });
  const [isExpenseAdded, setIsExpenseAdded] = useState(false);

  const [renderMessage, setRenderMessage] = useState("");
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isExpenseAdded) {
      setIsExpenseAdded(false);
    }
  }, [isExpenseAdded]);

  useEffect(() => {
    setFromData((prevData) => ({ ...prevData, category: searchedData }));
  }, [searchedData]);

  // Only fetch data when the session is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      // const userID = session.user._id ?? "";
      // console.log(userID);
      const fetchData = async () => {
        try {
          const data = await fetchExpenses(userID);
          // console.log("fetchedData", data.expenses);
          setFetchedExp(data.expenses);

          // const catchedData = sessionStorage.getItem(`expenses-${userID}`);
          // // console.log(catchedData)
          // if (catchedData) {
          //   setFetchedExp(JSON.parse(catchedData));
          // } else {
          //   const data = await fetchExpenses(userID);
          //   // console.log("fetchedData", data.expenses);
          //   setFetchedExp(data.expenses);
          //   sessionStorage.setItem(
          //     `expenses-${userID}`,
          //     JSON.stringify(data.expenses)
          //   );
          // }
        } catch (error) {
          setError(`Error occurred while fetching the data: ${error}`);
        }
      };

      // const Debouncefunction = debounce(fetchData, 1000);

      // Debouncefunction();
      fetchData();
    }
  }, [refreshRequired, status, userID]);

  const searchedCategory = (data: string) => {
    // console.log("view all exp", data);
    setSearchedData(data);
  };
  const handleSearchBarerror = (searchbar_error: string) => {
    if (searchbar_error) {
      console.log("search bar error message: ", searchbar_error);
      setError(searchbar_error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExpenseAdded(true);
    // console.log("form submitted", formData);
    const userID = session?.user._id ?? "";
    if (formData.category && formData.amount_spent && userID && formData._id) {
      try {
        const result = await updateExpenses({
          userID: userID,
          expenseID: formData._id,
          category: formData.category,
          amount_spent: Number(formData.amount_spent),
          description: formData.description,
        });
        const updatedData = fetchedExp.map((exp) =>
          exp._id === formData._id
            ? {
                ...exp,
                category: formData.category,
                amount_spent: Number(formData.amount_spent),
                description: formData.description,
              }
            : exp
        );
        setFetchedExp(updatedData);
        // sessionStorage.setItem(
        //   `expenses-${userID}`,
        //   JSON.stringify(updatedData)
        // );
        // console.log("result", result);
        setRenderMessage(result.message);
        setKey((prevkey) => prevkey + 1);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("Please enter all the mandatory field ");
      return;
    }
    SetRefreshRequired(!refreshRequired);
    setIsEdit(false);
  };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFromData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (expenseID: string) => {
    if (status == "authenticated" && userID && expenseID) {
      try {
        const result = await deleteExpense(userID, expenseID);
        const updatedData = fetchedExp.filter((exp) => exp._id !== expenseID);
        setFetchedExp(updatedData);
        // sessionStorage.setItem(
        //   `expenses-${userID}`,
        //   JSON.stringify(updatedData)
        // );
        setRenderMessage(result.message);
        setKey((prevkey) => prevkey + 1);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("unblae to delete the expenses");
    }
    SetRefreshRequired(!refreshRequired);
  };

  // Show loading or error message while waiting for session data or fetching expenses
  if (status === "loading") {
    return (
      <div className="text-xl text-center flex justify-center items-center">
        <p>Loading session...</p>
      </div>
    );
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
        <div className="relative grid grid-cols-1 gap-6">
          {fetchedExp.map((expense, index) => (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2 * index,
                  ease: easeInOut,
                  duration: 0.5,
                },
              }}
              exit={{ opacity: 0, y: 50 }}
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
                <span onClick={() => handleDelete(expense._id)}>
                  <DeleteOutlineIcon className=" cursor-pointer hover:text-red-600 " />
                </span>
              </span>
              <h1 className="text-lg font-medium text-gray-700 capitalize">
                {expense.category}
              </h1>
              <p className="text-gray-500 text-sm">{expense.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-semibold text-green-600">
                  ₹{expense.amount_spent.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400">
                  {expense.timestamp
                    ? new Date(expense.timestamp).toLocaleDateString("en-GB")
                    : ""}
                </span>
              </div>
            </motion.div>
          ))}
          <span className="flex justify-center text-center absolute -bottom-16 w-full underline underline-offset-1 ">
            <Link
              href={"newExp"}
              className=" font-semibold hover:text-blue-500"
            >
              {" "}
              Want to add new expense?
            </Link>
          </span>
        </div>
        {/* <UpdateExpenses/> */}
      </div>
      {isEdit && (
        <div className=" fixed flex inset-0 bg-dark bg-opacity-50 items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, x: -50, y: -50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: 50 }}
            className="bg-light rounded-lg shadow-lg w-96 md:w-[21rem] p-6"
          >
            <h2 className="text-xl font-bold mb-4"> Edit Expense</h2>
            <label
              htmlFor="Category"
              className="block text-gray-700 font-medium"
            >
              Category <span className="text-red-600">*</span>
            </label>
            <CategoriesSearchBar
              UpdatedCategoryEdit={formData.category}
              currentCategory={searchedCategory}
              searchBarErrrmsg={handleSearchBarerror}
              isExpenseAdded={isExpenseAdded}
            />
            <form onSubmit={handleSubmit}>
              <div className="mb-5"></div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Amount Spent <span className="text-red-600">*</span>
                </label>
                <label className=" absolute text-xl z-10 px-4 py-3 font-semibold text-yellowgreen">
                  ₹
                </label>
                <input
                  type="number"
                  name="amount_spent"
                  value={formData.amount_spent}
                  onChange={handleOnChange}
                  className="w-full border-2 pl-10 text-gray-400 bg-gray-700   border-orange-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 px-4 py-3"
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
                  className="w-full text-gray-400 bg-gray-700   border-orange-600 px-4 py-2 border-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  rows={3}
                />
              </div>
              <div className="flex justify-end md:justify-center gap-2">
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
      <PopupNotification key={key} showMessage={renderMessage} />
    </>
  );
};

export default Page;
