"use client";

import { useState, useEffect } from "react";
// import handler from "../api/(Database)/categories"

function useDebounse(value: string, delay: number) {
  const [debounceValue, SetDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      SetDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}

const CategoriesSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);



  const delaysearchTerm = searchTerm.length >= 2 ?  useDebounse(searchTerm, 500) : "";

  useEffect(() => {
    if (delaysearchTerm) {
      setLoading(true);
      fetch(`/api/categories?name=${delaysearchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error fetching the suggestions", error);
          setLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [delaysearchTerm]);
  return (
    <div className=" mt-10 flex justify-center items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      <ul>
      </ul>
    </div>
  );
};

export default CategoriesSearchBar;
