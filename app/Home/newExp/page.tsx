"use client";
import { useState, useEffect, EventHandler } from "react";
import { addCategory, fetchCategories } from "@/app/lib/axios";
import { Formater } from "@/app/lib/currencyFormater";
import { Heading } from "@/app/Components/motion_components/motionTags";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const page = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (newCategory.length >= 2) {
      const loadCategories = async () => {
        try {
          const fetchedCategory = await fetchCategories(newCategory);
          setCategories(fetchedCategory);
        } catch (error) {
          setError(`failed to load categories ${error}`);
        }
      };
      loadCategories();
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
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    const numaricValue = rawValue.replace(/[^\d.-]/g, "");

    setAmount(numaricValue);
  };
  const formatedValue = Formater(amount);

  return (
    <div className=" flex flex-col justify-center items-start md:items-center m-12 gap-3">
      <Heading
        text="Add new Expenses: "
        className=" text-6xl md:text-4xl mb-5 "
      />

      <div className="max-w-md mx-auto p-8  bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-lg shadow-md space-y-5">
        <div className="relative">
          <span className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <SearchIcon sx={{ color: "burlywood" }} />
          </span>
          <input
            type="text"
            id="searchInput"
            placeholder="Search Categories..."
            className="w-full pl-10 px-4 py-3 text-gray-400 bg-gray-700  border border-orange-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          {newCategory ? (
            <button
              className={`flex absolute inset-0 left-[21rem] md:left-[19rem] items-center justify-center text-light hover:text-yellowgreen rounded-full ${
                categories.length
                  ? ""
                  : "transition-transform rotate-45  ease-in delay-500"
              }  `}
              onClick={
                categories.length ? () => setNewCategory("") : handleAddCategory
              }
            >
              <CloseIcon />
            </button>
          ) : (
            ""
          )}
          {categories.length > 0 && (
            <ul className="absolute left-0 right-0 mt-2 bg-light   border-gray-600 border rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {categories.map((category: string, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
        <label htmlFor="Amount" className=" text-[#deb887] absolute text-xl px-4 p-3 font-semibold  ">₹</label>
        <input
        id="Amount"
          type="number"
          placeholder="Amount Spent"
          className="w-full pl-10 px-4 py-3 border text-gray-400 bg-gray-700   border-orange-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      

        <textarea
          placeholder="Add description..."
          rows={4}
          className="w-full  text-gray-400 bg-gray-700   border-orange-600 px-4 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <span className="flex items-center justify-center">
        <button className="bg-gradient-to-r from-purple-500 to-purple-900 px-4 py-2 rounded-lg text-white font-semibold hover:bg-gradient-to-l hover:from-purple-500 hover:to-purple-900 "> Submit</button>
        </span>
       
      </div>
    </div>
  );
};

export default page;
