import { Redis } from "@upstash/redis";
import { ExpenseDataDef } from "../Home/viewAllExp/page";

// const redisClient = createClient({
//   url: "rediss://default:AT4gAAIjcDEyODA3MzNhMWJhNzM0ODkxODlmMDA3MzNlY2FiMTk5ZXAxMA@frank-sponge-15904.upstash.io:6379",
// });

const redisClient = new Redis({
  url: process.env.NEXT_UPSTASH_REDIS_REST_URL,
  token: process.env.NEXT_UPSTASH_REDIS_REST_TOKEN,
  // url: "https://frank-sponge-15904.upstash.io",
  // token: "AT4gAAIjcDEyODA3MzNhMWJhNzM0ODkxODlmMDA3MzNlY2FiMTk5ZXAxMA",
});

// Get request
// export async function getCachedExpense(userID: string) {
//   const keys = await redisClient.keys(`expenses:${userID}:*`);
//   if (keys.length === 0) return null;
//   const expenses = (await redisClient.mget(keys)) as (string | null)[];
//   return expenses;
// }

// export async function setCachedExpense(
//   userID: string,
//   expenseID: string,
//   expense: Expense
// ) {
//   await redisClient.setex(
//     `expenses:${userID}:${expenseID}`,
//     600,
//     JSON.stringify(expense)
//   );
// }

// export async function invalidateExpense(userID: string, expenseID: string) {
//   await redisClient.del(`expenses:${userID}:${expenseID}`);
// }

// export async function invalidateAllExpense(UserID: string) {
//   const keys = await redisClient.keys(`expenses:${UserID}:*`);
//   if (keys.length > 0) {
//     await redisClient.del(...keys);
//   }
// }

// export default redisClient;

// the above code is better when user has subscription for upstash, if we are using the free version then we get only 500k commands execution per month, the every time if user updates the expenses it will do set request which will utilize more commands also each expense Id is saved separately which is good for editing or deleting the expesnes but it will consume lot of commands.

export async function getCachedExpense(userID: string) {
  try {
    const data = (await redisClient.get(`${userID}`)) ;
    if (!data) return null;
    // console.log("get: ", typeof data)
    // console.log("get data: ",  data)
    return data;
  } catch (error) {
    console.error("redis get error:", error);
    return null;
  }
}

export async function setCachedExpense(
  userID: string,
  data:  ExpenseDataDef[]
) {
  try {
    // console.log("recived data::", data)
    // console.log("recived data type::", typeof data)
      await redisClient.set(`${userID}`,JSON.stringify(data), { ex: 900 });
  } catch (error) {
    console.error("redis set error", error);
    return null;
  }
}

export async function invalidateData(userID: String) {
  try {
    const result = await redisClient.del(`${userID}`);
    return result === 1;
  } catch (error) {
    console.error("redis delete error", error);
    return false;
  }
}

export default redisClient;
