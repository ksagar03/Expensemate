import React from "react";
import Logo from "../../public/Images/Logo.jpg";
import Image from "next/image";

const Header = () => {
  return (
    <div className=" flex justify-between items-center text-center p-3 mx-3 md:mx-1 md:text-sm">
      <Image
        className=" w-[50px] h-auto sm:w-[30px] md:w-[40px] rounded-2xl -mt-1"
        src={Logo}
        alt="Logo image"
      />
      <span className="flex gap-4 mx-4 md:mx-0">
        <button className=" font-semibold border-2 p-2 rounded-lg px-4 border-rose-600 hover:bg-black hover:text-light md:px-2 md:p-1 ">
          SignUp
        </button>
        <button className=" font-semibold border-2 p-2 rounded-lg px-4 border-rose-600 hover:bg-black hover:text-light md:px-2 md:p-1 ">
          Login
        </button>  
      </span>

    </div>
  );
};

export default Header;
