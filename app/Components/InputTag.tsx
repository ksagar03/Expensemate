"use client"
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface TagProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label_name: string;
  html_for: string;
  passwordHide?:boolean
}

const InputTag = ({
  id,
  name,
  type,
  placeholder,
  label_name,
  html_for,
  passwordHide,
}: TagProps) => {
    const [ showPassword , setShowPassword] = useState(false)
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <input
        autoComplete="off"
        id={id}
        name={name}
        type={showPassword? "text": type}
        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
        placeholder={placeholder}
      />
      <label
        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
        htmlFor={html_for}
      >
        {label_name} 
      </label>
      <button onClick={()=> setShowPassword(!showPassword)} className=" absolute left-56 hover:text-purple-600 ">
        {passwordHide ? showPassword ? <Visibility/> : <VisibilityOff/> :""}
        </button>
    </motion.div>
  );
};

export default InputTag;
