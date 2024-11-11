import React from "react";
import Header from "../Components/Header";
import Login_Signup from "../Components/Login_Signup";
import { Heading, Card } from "../Components/motion_components/motionTags";
import CategoriesSearchBar from "../Components/CategoriesSearchBar";
import Graph from "../Components/Graph";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from "next/link";

const Home = () => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style:"currency",
    currency: "INR"
  })
  return (
    <div className=" ">
      {/* <h1 className=" m-12 mt-14 text-center text-7xl font-semibold">Track your daily expenses</h1> */}
      <div className="">
      <Heading text="Track your daily expenses" className=" m-12" />
      {/* <CategoriesSearchBar /> */}
      <Card className=" block max-w-[24rem] h-28 ml-10 text-start p-6 bg-gradient-to-r from-yellow-400 to-violet-500 border-2 border-dark rounded-xl" >
        <div>
          <h1 className=" text-xl font-medium">
            Total expenses : {formatter.format(1234732.21)}
          </h1>
          
        </div>
      </Card>
      <Graph/>
      <div className="flex justify-evenly border-2 border-gray-500 mx-10 p-10 rounded-xl m-10  ">
        <Link href={"/Home/newExp"}>
        <Card className=" text-lg font-medium min-w-[24rem] h-28 bg-gradient-to-r p-6 from-yellow-400 to-violet-500 border-2 border-dark rounded-xl">
          Add New expenses {" "}
          <AddCircleOutlineIcon/>
        </Card>
        </Link>
        <Link href={"/Home/viewAllExp"}>
        <Card className="min-w-[24rem] h-28 bg-gradient-to-r p-6 from-yellow-400 to-violet-500 border-2 border-dark rounded-xl">
          view your expense
        </Card>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Home;
