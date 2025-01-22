"use client";
import { useState } from "react";
import React from "react";
import Logo from "../../public/Images/Logo.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { easeInOut, motion } from "framer-motion";
import Link from "next/link";

const Header = () => {
  const [loginorSignin, setLoginOrSignin] = useState("");
  const [dropDown, setDropDown] = useState(false);
  // const handleLogin_signup = () => {
  //   setLoginOrSignin("")
  // }
  const router = useRouter();
  const { data: session, status } = useSession();
  const userName = session?.user.name;

  return (
    <>
      <div className=" flex justify-between items-center text-center p-3 mx-3 md:mx-1 md:text-sm">
        <Link href={"/Home"}>
          <Image
            className=" w-[50px] h-auto sm:w-[30px] md:w-[40px] rounded-2xl -mt-1 shadow-lg shadow-gray-500"
            src={Logo}
            alt="Logo image"
          />
        </Link>
        {status === "loading" ? (
          ""
        ) : status !== "authenticated" ? (
          <span className="flex gap-4 mx-4 md:mx-0">
            <button
              className=" font-semibold border-2 p-2 rounded-lg px-4 border-rose-600 hover:bg-black hover:text-light md:px-2 md:p-1 "
              onClick={() => router.push("/Home/sign-up")}
            >
              SignUp
            </button>
            <button
              className=" font-semibold border-2 p-2 rounded-lg px-4 border-rose-600 hover:bg-black hover:text-light md:px-2 md:p-1"
              onClick={() => router.push("/Home/login")}
            >
              Login
            </button>
          </span>
        ) : (
          <>
            <h2>
              Welcome{" "}
              <motion.button
                onClick={(e) => setDropDown(!dropDown)}
                className=" text-center inline-flex px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-dark font-semibold text-lg rounded-xl shadow-lg transition duration-100 transform hover:shadow-xl focus:outline-none"
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, ease: easeInOut }}
              >
                {userName} ➜
              </motion.button>
            </h2>
            {dropDown ? (
              <span
                onClick={() => setDropDown(!dropDown)}
                className="fixed inset-0 z-10 w-full h-full bg-red-200 bg-opacity-80 "
              >
                <motion.div
                  className="z-20 min-w-[30v] bg-black/80 fixed top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 rounded-lg md:p-10  backdrop-blur-md p-20 content-center"
                  initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { duration: 0.3, ease: easeInOut },
                  }}
                >
                  <button
                    onClick={() => {
                      signOut();
                      setDropDown(!dropDown);
                      sessionStorage.removeItem(
                        `expenses-${session?.user._id}`
                      );
                    }}
                    className="mx-[58px] font-semibold border-2 py-2 rounded-lg px-4 border-rose-600 text-red-600 hover:bg-red-600 hover:text-light"
                  >
                    {" "}
                    Sign Out
                  </button>
                </motion.div>
              </span>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default Header;
