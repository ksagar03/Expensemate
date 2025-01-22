"use client";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { addCategory, debounce, fetchCategories } from "../lib/axios";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

interface searchbarparams {
  currentCategory(data: string): void;
  isExpenseAdded?: boolean;
  searchBarErrrmsg(error: string): void;
  UpdatedCategoryEdit?: string;
}

const CategoriesSearchBar = ({
  currentCategory,
  searchBarErrrmsg,
  isExpenseAdded,
  UpdatedCategoryEdit,
}: searchbarparams) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tosearch, setToSearch] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpAdded, setExpAdded] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState("");

  const currentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (UpdatedCategoryEdit) {
      setCategoryEdit(UpdatedCategoryEdit);
    }
  }, [UpdatedCategoryEdit]);

  // isExpenseAdded is not changing to false
  useEffect(() => {
    if (error) {
      searchBarErrrmsg(error);
    }
    if (isExpenseAdded) {
      setExpAdded(isExpenseAdded);
    }
    if (categoryEdit) {
      setNewCategory(categoryEdit);
      setSelectedCategory(categoryEdit);
      setToSearch(false);
    }
  }, [error, isExpenseAdded, categoryEdit]);

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (selectedCategory !== newCategory) {
      // console.log("ebtering into", categoryEdit == newCategory)
      setCategoryEdit("");
      setToSearch(true);
      setActiveIndex(0);
    }

    if (newCategory.length >= 2 && tosearch) {
      const loadCategories = async () => {
        try {
          const fetchedCategory = await fetchCategories(newCategory);
          setCategories(fetchedCategory);
        } catch (error) {
          setError(`failed to load categories ${error}`);
        }
      };
      const debounceFunction  = debounce(loadCategories, 500)
      debounceFunction()

      // loadCategories();
      // console.log("fetched : ", categories);
    } else {
      setCategories([]);
      setSelectedCategory("");
    }
  }, [newCategory, tosearch]);

  if (isExpAdded) {
    setNewCategory("");
    setSelectedCategory("");
    setError("");
    setToSearch(true);
    setExpAdded(false);
  }

  const handleAddCategory = async () => {
    try {
      if (!categories.includes(newCategory)) {
        // const addedCategory = await addCategory(newCategory);
        // setCategories((prev) => [...prev, addedCategory]);
        await addCategory(newCategory);
        setCategories([]);
      } else {
        alert(" Category already exists");
      }
      setNewCategory("");
    } catch (error) {
      setError("Failed to add category");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // console.log("index: ", activeIndex)
    if (e.key == "ArrowDown" && categories.length > 0) {
      setActiveIndex(
        activeIndex == categories.length - 1 ? 0 : activeIndex + 1
      );
    }
    if (e.key == "ArrowUp" && categories.length > 0) {
      setActiveIndex(
        activeIndex == 0 ? categories.length - 1 : activeIndex - 1
      );
    }

    if (e.key == "Enter") {
      if (categories.length !== 0) {
        setNewCategory(categories[activeIndex]);
        setSelectedCategory(categories[activeIndex]);
        currentCategory(categories[activeIndex]);
        setToSearch(!tosearch);
      } else {
        setError("please add category to the List");
      }
    }
  };

  return (
    <div className="relative">
      <span className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <SearchIcon sx={{ color: "burlywood" }} />
      </span>
      <input
        ref={currentRef}
        type="text"
        id="searchInput"
        placeholder="Search Categories..."
        className="w-full pl-10 px-4 py-3 border-2 text-gray-400 bg-gray-700   border-orange-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 capitalize"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        autoComplete="off"
        required
      />
      {newCategory && tosearch ? (
        <button
          className={`flex absolute inset-0 xs:left-[14rem] md:left-[19rem] items-center justify-center text-light hover:text-yellowgreen rounded-full ${
            categories.length
              ? ""
              : "transition-transform rotate-45 ease-in-out delay-600"
          } ${UpdatedCategoryEdit ? "left-[18rem]" : "left-[21rem]"} `}
          onClick={
            categories.length ? () => setNewCategory("") : handleAddCategory
          }
        >
          <CloseIcon />
        </button>
      ) : (
        ""
      )}
      {categories.length > 0 && (
        <ul className="absolute z-20 left-0 right-0 mt-2 bg-light   border-gray-600 border rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {categories.map((category: string, index) => (
            <li
              onClick={() => {
                setNewCategory(categories[index]);
                setSelectedCategory(categories[activeIndex]);
                currentCategory(categories[activeIndex]);
                setToSearch(false);
              }}
              key={index}
              className={`px-4 py-1 border border-gray-500 cursor-pointer ${
                activeIndex == index ? " bg-slate-300" : ""
              } hover:bg-slate-300 `}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesSearchBar;
