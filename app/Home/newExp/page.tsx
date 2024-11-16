"use client";
import { useState, useEffect, EventHandler } from "react";
import { addCategory, fetchCategories } from "@/app/lib/axios";
import { Formater } from "@/app/lib/currencyFormater";

const page = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (newCategory.length >= 2) {
      const loadCategories = async () => {
        try {
          const fetchedCategory = await fetchCategories(newCategory);
          setCategories(fetchedCategory);
        } catch (error) {
          setError(`failed to load categories ${error}`);
        }
      };
      loadCategories();
    } else {
      setCategories([]);
    }
  }, [newCategory]);
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
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    

    const numaricValue = rawValue.replace(/[^\d.-]/g, "")

    setAmount(numaricValue);
  };
  const formatedValue = Formater(amount);

  return (
    <div className=" flex flex-col items-center justify-center">
      <div>
        <h2 className="text-lg font-semibold"> Search for the Category:</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Search Category"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div> 
      <div>
    
        <label htmlFor="currency-input">Amount spent: </label>
        <input
          id="currency-input"
          type="text"
          value={formatedValue}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <label htmlFor="discription" >Discription</label>
        <textarea name="discription" id="discription"></textarea>
      </div>
    </div>
  );
};

export default page;
