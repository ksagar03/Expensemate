"use client";
import { useEffect, useState } from "react";
import React from "react";
import { addCategory, fetchCategories } from "@/app/lib/axios";

import CategoriesSearchBar from "@/app/Components/CategoriesSearchBar";
import { error } from "console";

const pages = () => {
  const [searchedData, setSearchedData] = useState("");

  const searchedCategory = async (data: string) => {
    console.log("searched cate -->", data);
    setSearchedData(data);
  };
  const handleErrorMessage = () => {

  }

  useEffect(() => {
    console.log("searched category --->", searchedData);
  }, [searchedData]);

  return (
    <div>
      <CategoriesSearchBar currentCategory={searchedCategory} searchBarErrrmsg={handleErrorMessage} />
    </div>
  );
};

export default pages; 
