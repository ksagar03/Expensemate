"use client";
import { useEffect, useState } from "react";
import React from "react";
import { addCategory, fetchCategories } from "@/app/lib/axios";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CategoriesSearchBar from "@/app/Components/CategoriesSearchBar";

const pages = () => {
  return (
    <div>
      <CategoriesSearchBar />
    </div>
  );
};

export default pages;
