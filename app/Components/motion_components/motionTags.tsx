"use client";
import { Opacity } from "@mui/icons-material";
import { easeIn, motion } from "framer-motion";
import { ReactHTMLElement } from "react";

interface heading {
    text: string
    className?: string
}

export const Heading = ({text, className}:heading) => {
    const stringanime ={
        initial:{
            opacity:0,
        }, 
        animate:{
            opacity:1,
            transition:{
                delay:0.5,
                staggerChildren: 0.09
            }
        }
    }
    const wordAnime ={
        initial:{
            opacity:0.5,
            y:100,
        }, 
        animate:{
            opacity:1,
            y:0,
            transition:{
                duration:1,
            }
        }

    }
  return (
    <div className=" ">
      <motion.h1
        className={` inline-block w-full font-semibold capitalize text-7xl text-dark text-center ${className}`}
      variants={stringanime}
      initial ='initial'
      animate = "animate"
      >
        {text.split(" ").map((word, index) => 
          <motion.span key={index} className="inline-block"
          variants={wordAnime}>
            {word}&nbsp;
          </motion.span>
        )
        }
      </motion.h1>
    </div>
  );
};

type card = {
  className: string;
  children ?: React.ReactNode
}


export const Card = ({className, children}:card) => {
  return(
    <motion.div className={`${className} ` }
    initial={{x: -200, opacity:0}}
    animate = {{x:0, opacity: 1, transition:{delay:0.2, ease: easeIn}}}
    >
      {children}
    </motion.div>
  )
}



