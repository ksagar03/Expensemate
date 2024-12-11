"use client";
import React from "react";
import { Heading, Card } from "../Components/motion_components/motionTags";
import Graph from "../Components/Graph";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";
import { Formater } from "../lib/currencyFormater";
import NumberFlow from "@number-flow/react";
import { useSession } from "next-auth/react";
import { fetchExpenses } from "../lib/axios";
import { useState, useEffect } from "react";
import { ExpenseDataDef } from "./viewAllExp/page";

const Home = () => {
  const [fetchedExp, setFetchedExp] = useState<number[]>([]);
  const [currentVal, setCurrentVal] = useState(0);
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const userID = session?.user._id ?? "";
  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        try {
          const data = await fetchExpenses(userID);
          // console.log("fetchedData", data.expenses);
          const amount_spentData = data.expenses.map(
            (expense: ExpenseDataDef) => expense.amount_spent
          );
          setFetchedExp(amount_spentData);
          //  const calculatedTotalSum = amount_spentData.reduce((acc:number, currentValue:number) => acc + currentValue, 0)
          // console.log(calculatedTotalSum)
        } catch (error) {
          setError(`Error occurred while fetching the data: ${error}`);
        }
      };
      fetchData();
    }
  }, [status, userID]);

  useEffect(() => {
    if (fetchedExp.length > 0) {
      const totalExpenses = fetchedExp.reduce(
        (acc, expense) => acc + expense,
        0
      );
      // console.log(totalExpenses);
      let tempVal = 0;
      const step = totalExpenses / 10;
      const intervalId = setInterval(() => {
        tempVal += step;
        setCurrentVal(Math.min(tempVal, totalExpenses)); // Ensure we don't exceed totalExpenses
        if (tempVal >= totalExpenses) {
          clearInterval(intervalId);
        }
      }, 100);

      // setCurrentVal(totalExpenses);
    }
  }, [fetchedExp]);

  return (
    <>
      {status === "authenticated" ? (
        <div className="">
          <Heading text="Track your daily expenses" className=" m-12" />
          <Card
            className=" block max-w-[28rem] ml-10 h-28 text-center items-center p-6 bg-gradient-to-r from-yellow-400 to-violet-500 border-2 border-dark rounded-xl 
  sm:max-w-full sm:h-auto sm:p-4 sm:m-5 sm:text-center bg-[length:200%_200%] animate-gradient shadow-lg shadow-gray-600"
          >
            <div>
              {/* <h1 className=" text-xl font-medium">
            Total expenses : {Formater("1234732.21")}
          </h1> */}
              <NumberFlow
                key={currentVal}
                className=" font-bold text-2xl"
                value={currentVal}
                format={{
                  style: "currency",
                  currency: "INR",
                  trailingZeroDisplay: "stripIfInteger",
                }}
                prefix="Total expenses : "
              />
            </div>
          </Card>
          <Graph />
          <div className="flex flex-wrap justify-evenly gap-6 border-2 border-gray-500 mx-10 p-10 rounded-xl m-10 md:flex-col">
            <Link href={"/Home/newExp"}>
              <Card className="text-lg sm:text-base font-medium min-w-[26rem] items-center sm:min-w-[15rem] md:min-w-[24rem] min-h-28 h-auto bg-gradient-to-r p-6 from-yellow-400 to-violet-500 border-2 border-dark rounded-xl hover:bg-[length:200%_200%] hover:animate-gradient hover:shadow-current hover:shadow-md shadow-lg shadow-gray-600 ">
                Add New expenses <AddCircleOutlineIcon />
              </Card>
            </Link>
            <Link href={"/Home/viewAllExp"}>
              <Card className="text-lg sm:text-base font-medium min-w-[26rem] items-center sm:min-w-[15rem] md:min-w-[24rem] min-h-28 h-auto bg-gradient-to-r p-6 from-yellow-400 to-violet-500 border-2 border-dark rounded-xl hover:bg-[length:200%_200%] hover:animate-gradient hover:shadow-current hover:shadow-md shadow-lg shadow-gray-600">
                View your expense
              </Card>
            </Link>
          </div>
        </div>
      ) : (
        <span className="min-h-screen flex justify-center items-center  text-center text-2xl font-semibold">
          {status === "loading" ? (
            <p> Loading please wait...</p>
          ) : (
            <p className="">
              {" "}
              Uh-oh, you’re not logged in! We can’t show your expenses until you
              make it official. Hurry up before they vanish like that last slice
              of pizza!😏😏😏
            </p>
          )}
        </span>
      )}
    </>
  );
};

export default Home;
