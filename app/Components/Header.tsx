"use client"
import { useState } from "react";
import React from "react";
import Logo from "../../public/Images/Logo.jpg";
import Image from "next/image";
import Login_Signup from "./Login_Signup";

const Header = () => {
  const [loginorSignin, setLoginOrSignin] = useState("")
  // const handleLogin_signup = () => {
  //   setLoginOrSignin("")
  // } 
  return (
    <>
   
    <div className=" flex justify-between items-center text-center p-3 mx-3 md:mx-1 md:text-sm">
      <Image
        className=" w-[50px] h-auto sm:w-[30px] md:w-[40px] rounded-2xl -mt-1"
        src={Logo}
        alt="Logo image"
      />
      <span className="flex gap-4 mx-4 md:mx-0">
        <button className=" font-semibold border-2 p-2 rounded-lg px-4 border-rose-600 hover:bg-black hover:text-light md:px-2 md:p-1 " onClick={()=> setLoginOrSignin("Signup")}>
          SignUp
        </button>
        <button className=" font-semibold border-2 p-2 rounded-lg px-4 border-rose-600 hover:bg-black hover:text-light md:px-2 md:p-1" onClick={()=> setLoginOrSignin("Login")}>
          Login
        </button>  
      </span>

    </div>
    <Login_Signup userAction ={loginorSignin}  />
    </>
  );
};

export default Header;
