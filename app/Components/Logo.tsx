"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";



const Logo = () => {
  const router = useRouter()
  const handleVideoEnd = () => {
    console.log("navigating to the Home page")
    router?.push("/Home")
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black">

  
    <video width={800} autoPlay muted onEnded={handleVideoEnd} >
      <source src="/logoVideo/video.webm" type="video/webm" />
    </video>
    </div>
  );
};

export default Logo;
