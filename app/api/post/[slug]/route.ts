// pages/api/post.ts
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params; // Get the slug from the URL params

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const folder = path.join(process.cwd(), "content", "posts");
    // const folder = "content/posts/";
    const file = `${folder}/${slug}.md`;
    const content = await fs.readFile(file, "utf8");
    const matterResult = matter(content);
    
    return NextResponse.json(matterResult);
    // return NextResponse(matterResult);
  } catch (error) {
    return NextResponse.json({ error: "Post not found" });
  }
}


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { slug } = req.query;

//   if (!slug) {
//     return res.status(400).json({ error: "Missing slug" });
//   }

//   try {
//     const folder = path.join(process.cwd(), "content", "posts");
//     // const folder = "content/posts/";
//     const file = `${folder}/${slug}.md`;
//     const content = await fs.readFile(file, "utf8");
//     const matterResult = matter(content);
    
//     return res.status(200).json(matterResult);
//   } catch (error) {
//     return res.status(500).json({ error: "Post not found" });
//   }
// }
