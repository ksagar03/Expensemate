"use client";
import { useState, useEffect } from "react";
import { fetchCategories, addCategory } from "@/app/lib/axios";

const page = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
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
  return <div>New Expenses</div>;
};

export default page;
