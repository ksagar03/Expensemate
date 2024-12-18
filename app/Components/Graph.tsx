"use client";
import React from "react";
import { format } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ExpenseDataDef } from "../Home/viewAllExp/page";

interface Graphprops {
  data: ExpenseDataDef[];
}

const Graph = React.memo(({ data }: Graphprops) => {
  const updatedData = data.map((e) => {
    return {
      ...e,
      monthYear: e.timestamp ? format(new Date(e.timestamp), "MMM yyy") : "",
    };
  });

  return (
    <>
      {updatedData.length ? (
        <div className=" m-10 ml-6 p-5  border-2 rounded-xl shadow-slate-300 shadow-xl">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart width={400} height={400} data={updatedData}>
              <XAxis dataKey="monthYear" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length > 0) {
                    const { category, amount_spent } = payload[0].payload;
                    return (
                      <div>
                        <p>
                          <strong>Category</strong> {category}
                        </p>
                        <p>
                          <strong>Amount Spent</strong> {amount_spent}
                        </p>
                      </div>
                    );
                  }
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="amount_spent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <h1 className=" text-center mt-10 font-bold text-lg mx-10">
          Oops! It seems like your expense list is as empty as your coffee cup.
          Add some expenses, and we'll show you the graph!
        </h1>
      )}
    </>
  );
});

export default Graph;