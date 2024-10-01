import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Handle POST request to increment claps
export async function POST(req: Request) {
  try {
    // Parse the request body
    const { path } = await req.json();
    const slug = path.split("/").pop(); // Extract the slug from the path
    // console.log("Clap for slug:", slug);

    // Update the claps count for the post with this slug
    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        claps: {
          increment: 1, // Increment the claps by 1
        },
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Failed to update claps" }, { status: 500 });
  }
}
