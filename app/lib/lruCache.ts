import { LRUCache } from "lru-cache";
import { ExpenseDataDef } from "../Home/viewAllExp/page";
// import { Expense } from "../models/userModel";

//  This Can't be used as the Next js API route uses serverless so CRUD operation will be happing in different server so lru cache works only when the working in one server(i.e the data stored in the server1 can not be accessed by the server 2)

const lruCache = new LRUCache<string, ExpenseDataDef[]>({
  max: 100,
  ttl: 1000 * 60 * 6, // 6 mins
});

export default lruCache;
