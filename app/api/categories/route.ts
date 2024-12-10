// // import type { NextApiRequest, NextApiResponse } from "next";
// // import openDb from "@/app/lib/db";

// // type Category = {
// //   id: number;
// //   name: string;
// // };
// // type Data = Category | Category[] | { error: string };

// // const sendErrorResponse = (
// //   res: NextApiResponse<Data>,
// //   statusCode: number,
// //   message: string
// // ) => {
// //   res.status(statusCode).json({ error: message });
// // };

// // const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
// //   const db = await openDb();

// //   if (req.method !== "POST" && req.method !== "GET") {
// //     return sendErrorResponse(res, 405, "Method not allowed");
// //   }

// //   if (req.method == "POST") {
// //     const { name } = req.body;
// //     if (!name) {
// //       return sendErrorResponse(res, 400, "Name is required");
// //     }

// //     try {
// //       const result = await db.run("INSERT INTO users (name) VALUES (?)", name);
// //       if (typeof result.lastID !== "number") {
// //         return sendErrorResponse(res, 500, "Failed to get last inserted ID");
// //       }
// //       return res.status(201).json({ id: result.lastID, name });
// //     } catch (error) {
// //       return sendErrorResponse(res, 400, "Failed to add name.");
// //     }
// //   }
// //   // else{
// //   //   res.status(405).json({error: "method not allowed"})
// //   // }
// //   if (req.method == "GET") {
// //     const { name } = req.query;

// //     try {
// //       if (name) {
// //         const query = `%${name}%`;
// //         const categories: Category[] = await db.all(
// //           "SELECT id, name FROM categories WHERE name LIKE ? LIMIT 5 ",
// //           query
// //         );
// //         return res.status(200).json(categories);
// //       }
// //       // if there is no query then
// //       const categories: Category[] = await db.all(
// //         "SELECT id, name FROM categories LIMIT 5"
// //       );
// //       return res.status(200).json(categories);
// //     } catch (error) {
// //       console.error(error);
// //       return sendErrorResponse(res, 500, "Internal Server Error");
// //     }
// //   }
// // };

// // export default handler;
// // Above code is for sqlite which is not feasable with Vercel

// "use server";
// import dbConnect from "@/app/lib/dbConnect";
// import Categories from "@/app/models/categoriesModel";
// import { NextApiRequest, NextApiResponse } from "next";

// let cachedCategories: string[] | null | undefined = undefined;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await dbConnect();

//   const { method, query } = req;
//   const searchQuery = query.search as string;

//   switch (req.method) {
//     case "GET":
//       try {
//         if (cachedCategories === null || cachedCategories === undefined) {
//           const categoryDoc = await Categories.findOne();
//           cachedCategories = categoryDoc ? categoryDoc.categories : [];
//         }

//         let filterCategories = cachedCategories;

//         if (searchQuery) {
//           filterCategories = cachedCategories?.filter((category) =>
//             category.toLowerCase().includes(searchQuery.toLowerCase())
//           );
//         }
//         res.status(200).json({ success: true, categories: filterCategories });
//       } catch (error) {
//         res
//           .status(500)
//           .json({ success: false, error: "Failed to fetch categories" });
//       }
//       break;
//     case "POST":
//       try {
//         const { newCategory } = req.body;

//         if (!newCategory) {
//           return res
//             .status(400)
//             .json({ success: false, error: "Category name is required" });
//         }

//         let categoryData = await Categories.findOne();
//         if (!categoryData) {
//           categoryData = new Categories({ categories: [] });
//         }

//         if (!categoryData.categories.includes(newCategory)) {
//           categoryData.categories.push(newCategory);
//           await categoryData.save();
//           cachedCategories = categoryData.categories;
//         }
//         res.status(201).json({ success: true, category: newCategory });
//       } catch (error) {
//         res
//           .status(500)
//           .json({ success: false, error: "Failed to add category" });
//       }
//       break;

//     default:
//       res.setHeader("Allow", ["Get", "POST"]);
//       res.status(405).end(`Method ${method} is not allowed`);
//   }
// }
//  this above Post and Get method will also not work, since the next js 13's App Router, requires named exports for each HTTP method (GET, POST, etc.),

"use server";
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Categories from "../../models/categoriesModel";

let cachedCategories: string[] | null | undefined = undefined;

// GET

export async function GET(req: NextRequest) {
  await dbConnect();

  const searchQuery = req.nextUrl.searchParams.get("search") || "";
  try {
    if (cachedCategories === null || cachedCategories === undefined) {
      const categoryData = await Categories.findOne();
      cachedCategories = categoryData ? categoryData.categories : [];
    }

    let filterCategories: string[] = cachedCategories || [];
    if (searchQuery) {
      filterCategories = filterCategories.filter((category) =>
        category.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
    }
    return NextResponse.json(
      { success: true, categories: filterCategories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { succes: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

//  POST

export async function POST(req: NextRequest) {
  
  try {
    await dbConnect();
    const body = await req.json();
    // console.log("req body:", body);
    const { newCategory } = body;

    if (!newCategory) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }
    let categoryData = await Categories.findOne();
    // console.log(categoryData);

    if (!categoryData) {
      categoryData = new Categories({ categories: [] });
      // console.log("new Category document ", categoryData);
    }

    if (!categoryData.categories.includes(newCategory)) {
      categoryData.categories.push(newCategory);
      await categoryData.save();
      // console.log('Updated categories:', categoryData.categories);
      cachedCategories = categoryData.categories;
    }

    return NextResponse.json(
      { success: true, category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add category" },
      { status: 500 }
    );
  }
}
