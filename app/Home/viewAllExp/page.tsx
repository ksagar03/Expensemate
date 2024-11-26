import React from "react";
// import { motion } from "framer-motion";

const page = () => {
  const userExpenses = [
    {
      category: "Food",
      amount_spent: 20.5,
      description: "Lunch at the café",
      timestamp: "2024-11-22T12:30:00Z",
    },
    {
      category: "Transport",
      amount_spent: 15.0,
      description: "Bus fare",
      timestamp: "2024-11-22T08:15:00Z",
    },
    {
      category: "Entertainment",
      amount_spent: 50.0,
      description: "Movie night",
      timestamp: "2024-11-21T19:00:00Z",
    },
    {
      category: "Groceries",
      amount_spent: 30.0,
      description: "Supermarket shopping",
      timestamp: "2024-11-20T17:00:00Z",
    },
  ];
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        User Expenses
      </h2>

      {/* Grid layout for expenses */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
        {userExpenses.map((expense, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="text-lg font-medium text-gray-700">
              {expense.category}
            </div>
            <p className="text-gray-500 text-sm">{expense.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-semibold text-green-600">
                ₹{expense.amount_spent.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400">
                {new Date(expense.timestamp).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
