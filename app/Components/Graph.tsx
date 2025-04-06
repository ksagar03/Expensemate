"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ExpenseDataDef } from "../Home/viewAllExp/page";
import { Skeleton } from "@mui/material";
import { motion, easeInOut } from "framer-motion";

interface Graphprops {
  data: ExpenseDataDef[];
}

const Graph = React.memo(({ data }: Graphprops) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    if (!loading) {
      setIsDataEmpty(data.length === 0);
    }
  }, [data, loading]);

  const updatedData = data.map((e) => {
    return {
      ...e,
      monthYear: e.timestamp ? format(new Date(e.timestamp), "MMM yyy") : "",
    };
  });

  return (
    <div className="m-10 ml-6 border-2 rounded-xl shadow-slate-300 shadow-xl">
      {loading || isDataEmpty ? (
        <div className="h-[400px] flex justify-center items-center">
          {loading ? (
            <Skeleton
              sx={{ bgcolor: "gray.500" }}
              animation="wave"
              variant="rectangular"
              width="100%"
              height={400}
            />
          ) : (
            <h1 className=" justify-center text-center font-bold text-lg">
              Oops! It seems like your expense list is as empty as your coffee
              cup. Add some expenses, and we'll show you the graph!
            </h1>
          )}
        </div>
      ) : (
        <motion.div
          className="p-5"
          initial={{ scale: 0, opacity: 0, x: "-50" }}
          animate={{
            x: "0",
            scale: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: easeInOut },
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart width={400} height={400} data={updatedData}>
              <defs>
                <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00C6FB" /> {/* Blue */}
                  <stop offset="50%" stopColor="#8338EC" /> {/* Purple */}
                  <stop offset="100%" stopColor="#FF4B2B" /> {/* Orange-Pink */}
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="amount_spent"
                stroke="#FFFFFF"
                strokeWidth={2}
                fill="url(#customGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  );
});

export default Graph;
