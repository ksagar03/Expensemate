"use client";
import {
  easeIn,
  easeInOut,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React from "react";

interface heading {
  text: string;
  className?: string;
}

export const Heading = ({ text, className }: heading) => {
  const stringanime = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.09,
      },
    },
  };
  const wordAnime = {
    initial: {
      opacity: 0.5,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <div className=" ">
      <motion.h1
        className={` w-full font-semibold capitalize text-7xl md:text-5xl sm:text-4xl text-dark text-center ${className}`}
        variants={stringanime}
        initial="initial"
        animate="animate"
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={wordAnime}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

type card = {
  className: string;
  children?: React.ReactNode;
};

export const Card = ({ className, children }: card) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.width - 0.5);
  };
  const background = useMotionTemplate`linear-gradient(135deg, hsl(${
    x.get() * 20 + 270
  }, 80%, 60%), hsl(${y.get() * 20 + 300}, 80%, 60%),hsl(${
    x.get() * 20 + 330
  }, 80%, 60%))`;

  return (
    <motion.div
      className={`${className} capitalize rounded-xl , shadow-lg, relative overflow-hidden`}
      style={{ background,
        rotateY,
          rotateX,
          transformPerspective: 1000,
       }}
      initial={{ x: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: easeInOut }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}

    >
      <motion.div
        className="p-8 h-full w-full"
        style={{
          rotateY,
          rotateX,
          transformPerspective: 1000,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
