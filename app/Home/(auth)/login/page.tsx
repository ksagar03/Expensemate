"use client";
import Google_Svg from "../../../../public/SVGs/Google_Svg";
import InputTag from "../../../Components/InputTag";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please Provide all fields");
      return
    }
    try {
      const result = await signIn("credentials", {
        // redirect: true,
        redirect: false,
        email,
        password,
        // callbackUrl: "/Home"
      });
      // console.log(result);
      if (result?.error === null) {

        router.replace("/Home");
      } else if (result?.error === "Error: no user") {
        setError("no user found with this mail-ID");
      } else if (result?.error === "Error: InCorrect Passowrd") {
        setError("incorrect password");
      } else {
        console.log(error);
      }
    } catch (error) {
      console.error("error:", error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center py-6 justify-center sm:py-12 z-10">
      <div className=" relative py-3 md:max-w-2xl mx-auto">
        <span className=" absolute inset-0 bg-gradient-to-r from-[#662D8C] to-[#ED1E79] shadow-lg transform -skew-y-0 -rotate-6 rounded-3xl"></span>
        <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl md:p-10 3xl:p-20">
          <Link
            href={"/Home"}
            className="absolute -mt-14 md:-mt-7 md:right-4 right-6 text-red-700 font-semibold hover:bg-gray-200 rounded-full p-3"
          >
            <CloseIcon fontSize="large" />
          </Link>
          <div className="mx-auto max-w-md">
            <h1 className=" text-2xl font-semibold">Login</h1>
            <div className="divide-y divide-gray-300">
              <form
                onSubmit={handleLoginSubmit}
                className="py-8 text-base leading-6 space-y-4 text-grey-700 sm:text-lg sm:leading-7"
              >
                <InputTag
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  html_for="email"
                  label_name="Email Address"
                  animation_delay={0.1}
                  onChange={setEmail}
                  value={email}
                />
                <InputTag
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Name"
                  html_for="password"
                  label_name="Password"
                  passwordHide={true}
                  animation_delay={0.2}
                  onChange={setPassword}
                  value={password}
                />
                <div className="relative ">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#4E65FF] to-[#A890FE] text-light font-semibold rounded-md px-3 py-2 hover:from-[#474955] hover:to-[#bebacf] "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className=" -mt-5 mb-3 text-center text-red-600">{error}</p>
          <p className=" p-2 -mt-3 mb-2">
            don't have an account?{" "}
            <Link
              href={"/Home/sign-up"}
              className=" cursor-pointer text-blue-500 hover:text-blue-600 font-semibold underline underline-offset-2 "
            >
              Signup
            </Link>
          </p>
          <span className="flex justify-center items-center">
            <span className="flex h-px bg-gray-400 flex-grow" />
            <p className="px-4">OR</p>
            <span className="flex h-px bg-gray-400 flex-grow" />
          </span>
          <div className="w-full flex justify-center">
            <button className=" flex items-center ng-light border border-gray-400 rounded-lg shadow-md px-6 py-2 mt-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 gap-2">
              <Google_Svg />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
