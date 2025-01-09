"use server";
import mongoose from "mongoose";

type ConnectionObj = {
  isConnected?: number;
};

const connection: ConnectionObj = {};

async function dbConnect(): Promise<void> {
  try {
    if (connection.isConnected) {
      console.log("Already connected to the DB");
      return;
    }
    // const MONGODB_URL = process.env.NEXT_PUBLIC_MONGODB_URL;
    // if (!MONGODB_URL) {
    //   throw new Error("URL not found");
    // }
    const db = await mongoose.connect(
      process.env.NEXT_PUBLIC_MONGODB_URL || "",
      {
        dbName: "ExpenseTracker",
      }
    ); // in the {} we can pass so many properties
    connection.isConnected = db.connections[0].readyState;

    console.log("connected to the DB");
  } catch (error) {
    console.log("connection failed", error);
    process.exit(500);
  }
}

export default dbConnect;
