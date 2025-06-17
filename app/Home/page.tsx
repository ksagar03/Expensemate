"use client";
import React from "react";
import { Heading, Card } from "../Components/motion_components/motionTags";

// import Graph from "../Components/Graph";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { signIn, useSession } from "next-auth/react";
import { debounce, fetchExpenses } from "../lib/axios";
import { useState, useEffect } from "react";
import { ExpenseDataDef } from "./viewAllExp/page";
const Graph = React.lazy(() => import("../Components/Graph"));

const Home = () => {
  const [fetchedExp, setFetchedExp] = useState<number[]>([]);
  const [fetchedData, setFetchedData] = useState<ExpenseDataDef[]>([]);
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
            setFetchedData(data.expenses);
            const amount_spentData = data.expenses.map(
              (expense: ExpenseDataDef) => expense.amount_spent
            );
            setFetchedExp(amount_spentData);


            
          // let catchedData = sessionStorage.getItem(`expenses-${userID}`);

          // if (catchedData) {
          //   let data = JSON.parse(catchedData);
          //   setFetchedData(data);
          //   const amount_spentData = data.map(
          //     (expense: ExpenseDataDef) => expense.amount_spent
          //   );
          //   setFetchedExp(amount_spentData);
          // } else {
          //   const data = await fetchExpenses(userID);
          //   // console.log("fetchedData", data.expenses);
          //   setFetchedData(data.expenses);
          //   const amount_spentData = data.expenses.map(
          //     (expense: ExpenseDataDef) => expense.amount_spent
          //   );
          //   setFetchedExp(amount_spentData);
          //   sessionStorage.setItem(
          //     `expenses-${userID}`,
          //     JSON.stringify(data.expenses) // if the data is stored retived for the first time then the data will be stored for the first time
          //   );
          // }
          //  const calculatedTotalSum = amount_spentData.reduce((acc:number, currentValue:number) => acc + currentValue, 0)
          // console.log(calculatedTotalSum)
        } catch (error) {
          setError(`Error occurred while fetching the data: ${error}`);
        }
      };
      // const debounceFunction = debounce(fetchData, 1000);
      // debounceFunction();
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
        setCurrentVal(Math.min(tempVal, totalExpenses));
        if (tempVal >= totalExpenses) {
          clearInterval(intervalId);
        }
      }, 100);

      // setCurrentVal(totalExpenses);
    }
  }, [fetchedExp]);
  const handleClick = async () => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: "test123@gmail.com",
        password: "Test@1234",
      });
      if (result?.error === null) console.log("Test Login sucessful");
    } catch(err) {
      setError(`error occured while Test login:${err}` )
    }
  };
  return (
    <>
      {status === "authenticated" ? (
        !error ? (
          <div className="">
            <Heading
              text="Track your daily expenses"
              className="mt-12 p-6 mb-8"
            />
            <Card
              className=" block max-w-[28rem] ml-10 h-28 mb-14 text-center items-center py-1 bg-gradient-to-r from-yellow-400 to-violet-500 border-2 border-dark rounded-xl sm:max-w-full sm:h-auto sm:p-4 sm:m-5 sm:text-center bg-[length:200%_200%] animate-gradient shadow-lg shadow-gray-600"
            >
              <div>
                {/* <h1 className=" text-xl font-medium">
            Total expenses : {Formater("1234732.21")}
          </h1> */}
                <NumberFlow
                  key={currentVal}
                  className=" font-bold text-3xl"
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
            <Graph data={fetchedData} />
            {/* <div className="">
            <React.Suspense fallback = {<div>
              <Skeleton className=" m-10 ml-6 p-5  border-2 rounded-xl shadow-slate-300 shadow-xl" animation="wave" variant="rectangular" height={400} />
            </div>}>
            

            </React.Suspense>

          </div> */}
            {/* <React.Suspense fallback={<div>Loading graph....</div>}>
          <Graph data={fetchedData}/>
          </React.Suspense> */}

            <div className="flex flex-wrap justify-evenly gap-6 border-2 shadow-xl shadow-slate-300 m-10 ml-6 p-10 rounded-xl md:flex-col">
              <Link href={"/Home/newExp"}>
                <Card className="text-xl md:text-sm font-semibold min-w-[25rem] items-center sm:min-w-[15rem] md:min-w-[24rem] min-h-24 h-auto bg-gradient-to-r p-4 from-yellow-400 to-violet-500 border-2  bg-[length:200%_200%] animate-gradient shadow-lg shadow-gray-600 border-dark">
                  Add New expenses <AddCircleOutlineIcon />
                </Card>
              </Link>
              <Link href={"/Home/viewAllExp"}>
                <Card className="text-xl md:text-sm font-semibold min-w-[25rem] items-center sm:min-w-[15rem] md:min-w-[24rem] min-h-24 h-auto bg-gradient-to-r p-4 from-yellow-400 to-violet-500 border-2 bg-[length:200%_200%] animate-gradient shadow-lg shadow-gray-600 border-dark">
                  View your expense
                </Card>
              </Link>
            </div>
          </div>
        ) : (
          <p className=" text-2xl text-center text-red-500">{error}</p>
        )
      ) : (
        <span className="min-h-screen flex justify-center items-center  text-center text-2xl font-semibold">
          {status === "loading" ? (
            <p> Loading please wait...</p>
          ) : (
            <div className="flex-col">
              <button
                onClick={handleClick}
                className=" animate-slide mb-10 sm:mb-5 text-yellowgreen rounded-2xl border-2 border-yellow-400 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] py-4 px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 hover:shadow-lg relative group "
              >
                Try Demo
                <span className=" text-light arrow ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-45">
                  →
                </span>
              </button>
              <p>
                {" "}
                Uh-oh, you’re not logged in! We can’t show your expenses until
                you make it official. Hurry up before they vanish like that last
                slice of pizza!😏😏😏
              </p>
            </div>
          )}
        </span>
      )}
    </>
  );
};

export default Home;

{
  /* <button className="animate-slide mb-10 sm:mb-5 text-light rounded-lg border-2 border-yellow-400 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] p-4 px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 hover:shadow-lg hover:shadow-current relative group">
  Try Demo
 
</button> */
}
