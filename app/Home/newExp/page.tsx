"use client";
import React, { useEffect, useState} from "react";
import {addExpenses } from "@/app/lib/axios";
import { Heading } from "@/app/Components/motion_components/motionTags";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CategoriesSearchBar from "@/app/Components/CategoriesSearchBar";
import PopupNotification from "@/app/Components/PopupNotification";

const page = () => {
  const [searchedData, setSearchedData] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [amountSpent, setAmountSpent] = useState<number>();
  const [description, setDescription] = useState("");
  const [isExpenseAdded, setIsExpenseAdded] = useState(false)
   const [renderMessage , setRenderMessage] = useState("")
   const [key, setKey] = useState(0)
 

useEffect(()=>{
  if(isExpenseAdded){
    setIsExpenseAdded(false)
  }
}, [isExpenseAdded])


  const searchedCategory =  (data: string) => {
    setSearchedData(data);
  };

  const handleSearchBarerror = (searchbar_error: string) => {
    if(searchbar_error){
      // console.log("search bar error message: ", searchbar_error);
      setError(searchbar_error)
    }
  }



  const { data: session, status } = useSession();

  // const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let rawValue = e.target.value;

  //   const numaricValue = rawValue.replace(/[^\d.-]/g, "");

  //   setAmount(numaricValue);
  // };
  // const formatedValue = Formater(amount);

  const handleOnclick = async () => {
    const userID = session?.user._id ?? "";
    if (userID && searchedData && amountSpent) {
      try{
        const result = await addExpenses({
          userID: userID,
          category: searchedData,
          amount_spent: amountSpent,
          description: description,
        });

        if(result.message == "Expense added successfully"){
          
        let UpdatedcatchedData = JSON.parse(sessionStorage.getItem(`expenses-${userID}`) || '{}' )

        UpdatedcatchedData = [...UpdatedcatchedData , { userID: userID,
          category: searchedData,
          amount_spent: amountSpent,
          description: description,
          _id: result.LastExpID
        }]
          // console.log("upadted datat",UpdatedcatchedData)

          sessionStorage.setItem(`expenses-${userID}`, JSON.stringify(UpdatedcatchedData))
        }
      
        setRenderMessage(result.message)
        setKey(prevKey => prevKey + 1)
        
      }catch(error){
        setError(`unable to add the expenses ${error}`)
      }
     
    } else {
      setError("Please enter all the fileds");
    }
    setIsExpenseAdded(true)
    setAmountSpent(0);
    setSearchedData("")
    setDescription("");
    setError("");
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
          <CategoriesSearchBar currentCategory={searchedCategory} searchBarErrrmsg={handleSearchBarerror} isExpenseAdded={isExpenseAdded} />
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
          <p className="text-center text-light">
            View all your{" "}
            <Link
              href="viewAllExp"
              className="hover:text-amber-100 underline  cursor-pointer"
            >
              Expenses
            </Link>
          </p>
        </motion.div>
      ) : (
        <p className="text-center text-2xl font-medium">
          SignUp or LogIn to add expenses—your wallet will thank you!😅😅
        </p>
      )}
      <PopupNotification key={key} showMessage={renderMessage} />
    </div>
  );
};

export default page

