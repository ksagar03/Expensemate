import React from "react";
// import { useState } from 'react'
import Google_Svg from "@/public/SVGs/Google_Svg";

const Login_Signup = ({ userSelection = true }) => {
  // const [isLogin, setIsLogin] = useState(userSelection)
  //   const Input_field = (
  //     id: string,
  //     name: string,
  //     type: string,
  //     placeholder: string,
  //     label_name: string,
  //     html_for: string
  //   ) => {
  //     return (

  //         <input
  //           autoComplete="off"
  //           id={id}
  //           name={name}
  //           type={type}
  //           className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
  //           placeholder={placeholder}
  //         />
  //     );
  //   };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col py-6 justify-center sm:py-12 ">
      <div className=" relative py-3 sm:max-w-2xl mx-auto">
        <span className=" absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform skew-y-0 -rotate-6 rounded-3xl"></span>

        <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl 3xl:p-20">
          <div className="mx-auto max-w-md">
            <div>
              <h1 className=" text-2xl font-semibold">Login</h1>
            </div>
            <div className="divide-y divide-gray-300">
              <div className="py-8 text-base leading-6 space-y-4 text-grey-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className=" peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className=" absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative  ">
                  <button className="bg-cyan-500 text-light rounded-md px-2 py-1">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className=" flex items-center ng-light border border-gray-400 rounded-lg shadow-md px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 gap-2">
              <Google_Svg />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login_Signup;
