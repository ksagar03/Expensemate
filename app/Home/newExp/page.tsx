"use client";
import React, { useState, useEffect, useRef } from "react";
import { addCategory, fetchCategories, addExpenses } from "@/app/lib/axios";
import { Formater } from "@/app/lib/currencyFormater";
import { Heading } from "@/app/Components/motion_components/motionTags";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const page = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [amountSpent, setAmountSpent] = useState<number>();
const [tosearch, setToSearch] = useState(true)
  const [description, setDescription] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const currentRef = useRef(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (newCategory.length >= 2 && tosearch) {
      const loadCategories = async () => {
        try {
         
            const fetchedCategory = await fetchCategories(newCategory);
            setCategories(fetchedCategory)
  
        } catch (error) {
          setError(`failed to load categories ${error}`);
        }
      };
      loadCategories();
      console.log("fetched : ", categories);
    } else {
      setCategories([]);
    }
  }, [newCategory]);
  const handleAddCategory = async () => {
    try {
      if (!categories.includes(newCategory)) {
        // const addedCategory = await addCategory(newCategory);
        // setCategories((prev) => [...prev, addedCategory]);
        await addCategory(newCategory);
        setCategories([]);
      } else {
        alert(" Category already exists");
      }
      setNewCategory("");
    } catch (error) {
      setError("Failed to add category");
    }
  };
  // console.log("added category:", newCategory);
  // console.log("fetched : ",categories)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    const numaricValue = rawValue.replace(/[^\d.-]/g, "");

    setAmount(numaricValue);
  };
  // const formatedValue = Formater(amount);

  const handleOnclick = async () => {
    const userID = session?.user._id ?? "";
    if (userID && newCategory && amountSpent) {
      await addExpenses({
        userID: userID,
        category: newCategory,
        amount_spent: amountSpent,
        description: description,
      });
    } else {
      setError("Please enter all the fileds");
    }
    setAmountSpent(0);
    setNewCategory("");
    setDescription("");
    setToSearch(true)
    setError("")
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // console.log("index: ", activeIndex)
    if (e.key == "ArrowDown" && categories.length > 0) {
      setActiveIndex(
        activeIndex == categories.length - 1 ? 0 : activeIndex + 1
      );
    }
    if (e.key == "ArrowUp" && categories.length > 0) {
      setActiveIndex(
        activeIndex == 0 ? categories.length - 1 : activeIndex - 1
      );
    }

    if (e.key == "Enter") {
      if(categories.length !== 0){
        setNewCategory(categories[activeIndex]);
        setToSearch(!tosearch)
      }else {
        setError("please add category to the List")
      }
    
    }
  };

  return (
    <div className=" flex flex-col justify-center min-h-screen  m-12 gap-3">
      <Heading
        text="Add new Expenses: "
        className=" text-6xl md:text-4xl mb-10"
      />
      {session?.user.name ? (
        <motion.div
          className="max-w-lg mx-auto p-7  bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-xl shadow-md space-y-5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          <div className="relative">
            <span className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <SearchIcon sx={{ color: "burlywood" }} />
            </span>
            <input
              ref={currentRef}
              type="text"
              id="searchInput"
              placeholder="Search Categories..."
              className="w-full pl-10 px-4 py-3 border text-gray-400 bg-gray-700   border-orange-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            {newCategory ? (
              <button
                className={`flex absolute inset-0 left-[21rem] md:left-[19rem] items-center justify-center text-light hover:text-yellowgreen rounded-full ${
                  categories.length
                    ? ""
                    : "transition-transform rotate-45  ease-in delay-500"
                }  `}
                onClick={
                  categories.length
                    ? () => setNewCategory("")
                    : handleAddCategory
                }
              >
                <CloseIcon />
              </button>
            ) : (
              ""
            )}
            {categories.length > 0 && (
              <ul className="absolute z-20 left-0 right-0 mt-2 bg-light   border-gray-600 border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {categories.map((category: string, index) => (
                  <li
                    onClick={() => {
                      setNewCategory(categories[index]);
                      setCategories([]);
                    }}
                    key={index}
                    className={`px-4 py-1 border border-gray-500 cursor-pointer ${
                      activeIndex == index ? " bg-slate-300" : ""
                    } hover:bg-slate-300 `}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <label
            htmlFor="Amount"
            className=" text-[#deb887] absolute z-10 text-xl px-4 p-3 font-semibold  "
          >
            ₹
          </label>
          <input
            id="Amount"
            type="number"
            placeholder="Amount Spent"
            className="w-full pl-10 px-4 py-3 border text-gray-400 bg-gray-700   border-orange-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={amountSpent}
            onChange={(e) => setAmountSpent(Number(e.target.value))}
          />

          <textarea
            placeholder="Add description..."
            rows={4}
            className="w-full  text-gray-400 bg-gray-700   border-orange-600 px-4 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <span className="flex flex-col items-center justify-center">
            {error ? (
              <p className="m-3 bg-light p-1 px-3 rounded-xl text-red-600">
                {error}
              </p>
            ) : (
              ""
            )}
            <button
              className="bg-gradient-to-r from-purple-500 to-purple-900 px-4 py-2 rounded-lg text-white font-semibold hover:bg-gradient-to-l hover:from-purple-500 hover:to-purple-900 "
              onClick={handleOnclick}
            >
              {" "}
              Submit
            </button>
          </span>
        </motion.div>
      ) : (
        <p className="text-center text-2xl font-medium">
          SignUp or LogIn to add expenses—your wallet will thank you!😅😅
        </p>
      )}
    </div>
  );
};

export default page;
