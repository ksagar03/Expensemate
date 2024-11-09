import type { NextApiRequest, NextApiResponse } from "next";
import openDb from "@/app/lib/db";

type Category = {
  id: number;
  name: string;
};
type Data = Category | Category[] | { error: string };

const sendErrorResponse = (
  res: NextApiResponse<Data>,
  statusCode: number,
  message: string
) => {
  res.status(statusCode).json({ error: message });
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const db = await openDb();

  if (req.method !== "POST" && req.method !== "GET") {
    return sendErrorResponse(res, 405, "Method not allowed");
  }

  if (req.method == "POST") {
    const { name } = req.body;
    if (!name) {
      return sendErrorResponse(res, 400, "Name is required");
    }

    try {
      const result = await db.run("INSERT INTO users (name) VALUES (?)", name);
      if (typeof result.lastID !== "number") {
        return sendErrorResponse(res, 500, "Failed to get last inserted ID");
      }
      return res.status(201).json({ id: result.lastID, name });
    } catch (error) {
      return sendErrorResponse(res, 400, "Failed to add name.");
    }
  }
  // else{
  //   res.status(405).json({error: "method not allowed"})
  // }
  if (req.method == "GET") {
    const { name } = req.query;

    try {
      if (name) {
        const query = `%${name}%`;
        const categories: Category[] = await db.all(
          "SELECT id, name FROM categories WHERE name LIKE ? LIMIT 5 ",
          query
        );
        return res.status(200).json(categories);
      }
      // if there is no query then
      const categories: Category[] = await db.all(
        "SELECT id, name FROM categories LIMIT 5"
      );
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return sendErrorResponse(res, 500, "Internal Server Error");
    }
  }
};

export default handler;
