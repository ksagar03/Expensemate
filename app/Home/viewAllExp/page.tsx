"use client";
import { fetchExpenses } from "@/app/lib/axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  ExpenseDetails,
  ExpenseDataDef,
  UpdateExpenses,
} from "@/app/Components/ExpenseDetails";

const Page = () => {
  const [fetchedExp, setFetchedExp] = useState<ExpenseDataDef[]>([]);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();

  // Only fetch data when the session is authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const userID = session.user._id ?? "";
      // console.log(userID);
      const fetchData = async () => {
        try {
          const data = await fetchExpenses(userID);
          // console.log("fetchedData", data.expenses);
          setFetchedExp(data.expenses);
        } catch (error) {
          setError(`Error occurred while fetching the data: ${error}`);
        }
      };
      fetchData();
    }
  }, [status, session]);

  // Show loading or error message while waiting for session data or fetching expenses
  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Use dummy data if session is not authenticated or no expenses are fetched

  return (
    <div className="p-6 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        User Expenses
      </h2>

      {/* Grid layout for expenses */}
      <div className="grid grid-cols-1 gap-6">
        {fetchedExp.map((expense, index) => (
          <ExpenseDetails
            key={index}
            category={expense.category}
            amount_spent={expense.amount_spent}
            description={expense.description}
            timestamp={expense.timestamp}
          />
        ))}
      </div>
      {/* <UpdateExpenses/> */}
  
    </div>
  );
};

export default Page;
