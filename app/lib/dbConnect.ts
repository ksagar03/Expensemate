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
    const db = await mongoose.connect(process.env.MONGODB_URL || "", {dbName: "ExpenseTracker"}); // in the {} we can pass so many properties
    connection.isConnected = db.connections[0].readyState;

    console.log("connected to the DB", db);
  } catch (error) {
    console.log("connection failed", error);

    process.exit();
  }
}
 
export default dbConnect;
  