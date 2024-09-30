import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request method:", req.method); // Log the incoming method

  if (req.method === "POST") {
    const { slug } = req.body;

    try {
      const post = await prisma.post.update({
        where: { slug },
        data: {
          claps: {
            increment: 1, // Increment the clap count
          },
        },
      });
      res.status(200).json(post);
    } catch (error) {
      console.error("Error updating claps:", error);
      res.status(500).json({ error: "Failed to update claps" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
