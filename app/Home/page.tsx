import React from "react";
import Header from "../Components/Header";
import Login_Signup from "../Components/Login_Signup";


const Home = () => {
  return <div className="">
    <Header/>
    <Login_Signup userSelection ={true}  />
  </div>;
};

export default Home;
