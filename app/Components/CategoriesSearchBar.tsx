"use client";

import { useState, useEffect } from "react";
// import handler from "../api/(Database)/categories"
import SearchIcon from "@mui/icons-material/Search";

function useDebounse(value: string, delay: number) {
  const [debounceValue, SetDebounceValue] = useState(value);
  if(debounceValue.length >= 2){
    useEffect(() => {
      const handler = setTimeout(() => {
        SetDebounceValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

  }
  return debounceValue;
}

const CategoriesSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const delaysearchTerm = useDebounse(searchTerm, 500);

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
    <div className=" mt-20 ">
      {/* <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      <ul>
      </ul> */}

      <div className=" flex justify-center items-center w-full mx-auto ">
	<form>   
        <div className="relative lg:w-[40vw] w-[600px] ">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
               <SearchIcon sx={{color:"burlywood"}}/>
            </div>
            <input type="text" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search catergories "
             
             value={searchTerm}
             onChange={(e)=> setSearchTerm(e.target.value)}/>
        </div>
    </form>
</div>
    </div>
  );
};

export default CategoriesSearchBar;
