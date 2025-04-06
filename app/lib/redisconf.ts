import { Redis } from "@upstash/redis";
import { Expense } from "../models/userModel";

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
export async function getCachedExpense(userID: string) {
  const keys = await redisClient.keys(`expenses:${userID}:*`);
  if (keys.length === 0) return null;
  const expenses = (await redisClient.mget(keys)) as (string | null)[];
  return expenses;
}

export async function setCachedExpense(
  userID: string,
  expenseID: string,
  expense: Expense
) {
  await redisClient.setex(
    `expenses:${userID}:${expenseID}`,
    600,
    JSON.stringify(expense)
  );
}

export async function invalidateExpense(userID: string, expenseID: string) {
  await redisClient.del(`expenses:${userID}:${expenseID}`);
}

export async function invalidateAllExpense(UserID: string) {
  const keys = await redisClient.keys(`expenses:${UserID}:*`);
  if (keys.length > 0) {
    await redisClient.del(...keys);
  }
}

export default redisClient;
