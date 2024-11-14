"use client";
import { useState, useEffect } from "react";
import { addCategory, fetchCategories } from "@/app/lib/axios";

const page = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategory = await fetchCategories()
        setCategories(fetchedCategory)
      } catch (error) {
        setError(`failed to load categories ${error}`);
      }
    };
    loadCategories();
  }, []);
  const handleAddCategory = async () => {
    try {
      if (!categories.includes(newCategory)) {
        const addedCategory = await addCategory(newCategory);
        setCategories((prev) => [...prev, addedCategory]);
      } else {
        alert(" Category already exists");
      }
      setNewCategory("");
    } catch (error) {
      setError("Failed to add category");
    }
  };
  return <div className=" flex justify-center">
    <h2 className="text-lg font-semibold"> Search for the Category:</h2>
    <ul>
      {categories.map((category , index) => (
        <li key={index}>{category}</li>
      ))}
    </ul>
    <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}
    placeholder="Search Category" />
    <button onClick={handleAddCategory}>Add Category</button>
    

  </div>;
};

export default page;
