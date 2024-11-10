import React from "react";
import Header from "../Components/Header";
import Login_Signup from "../Components/Login_Signup";
import { Heading } from "../Components/motion_components/motionTags";
import CategoriesSearchBar from "../Components/CategoriesSearchBar";

const Home = () => {
  return (
    <div className=" min-h-screen">
      {/* <h1 className=" m-12 mt-14 text-center text-7xl font-semibold">Track your daily expenses</h1> */}
      <div className="">
      <Heading text="Track your daily expenses" className=" m-12" />
      <CategoriesSearchBar />
      </div>
    </div>
  );
};

export default Home;
