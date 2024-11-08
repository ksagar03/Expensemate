import type { NextApiRequest, NextApiResponse } from "next";
import openDb from "@/app/lib/db";

type Data = {
  id?: number;
  name?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method == "POST"){
      const {name} = req.body
      if (!name){
        res.status(400).json({error: "Name is required"});
        return;
      }
      const db = await openDb();
      try{
        const result = await db.run("INSERT INTO users (name) VALUES (?)", name);
        res.status(200).json({id: result.lastID, name})

      }catch (error){
        res.status(400).json({error: "Failed to add name."})
      }
    } else{
      res.status(405).json({error: "method not allowed"})
    }
}
