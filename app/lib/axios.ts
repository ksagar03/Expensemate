import axios from "axios";
import { expenseData, expenseIdData } from "../api/expenses/route";


export const debounce =  (callback:()=> void | Promise<void> , delay:number) => {
  let timeout: NodeJS.Timeout | number;


  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay)
  }

}

export const fetchCategories = async (
  searchQuery: string
): Promise<string[]> => {
  const response = await axios.get("/api/categories", {
    params: { search: searchQuery },
  });
  return response.data.categories;
};

export const addCategory = async (newCategory: string) => {
  const response = await axios.post("/api/categories", { newCategory });
  return response.data.category;
};

// POST
export const addExpenses = async ({
  userID,
  category,
  amount_spent,
  description,
}: expenseData) => {
  try {
    const response = await axios.post("/api/expenses", {
      userID,
      category,
      amount_spent,
      description,
    });
    // console.log(response.data);
    return response.data
  } catch (error) {
    console.error("error while adding the expenses", error);
  }
};

//  GET
export const fetchExpenses = async (userID: string) => {
  try {
    const response = await axios.get("/api/expenses", {
      params: { userID: userID },
    });
    console.log("User expenses", response.data);
    return response.data;
  } catch (error) {
    console.error("error in fetching expenses", error);
  }
};

// PUT
export const updateExpenses = async ({
  userID,
  expenseID,
  category,
  amount_spent,
  description,
}: expenseIdData) => {
  try {
    const response = await axios.put("/api/expenses", {
      userID,
      expenseID,
      category,
      amount_spent,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("error in updating", error);
  }
};

// DELETE
export const deleteExpense = async (userID: string, expenseID: string) => {
  try {
    const response = await axios.delete("/api/expenses", {
      data: { userID, expenseID },
    });
    return response.data
    // console.log("expense delete", response.data);
  } catch (error) {
    console.error("error in deleting", error);
  }
};
