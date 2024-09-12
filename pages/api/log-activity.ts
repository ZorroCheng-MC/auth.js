import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

 if (req.method === "POST") {
   const { page, action } = req.body;

   if (!session.user?.id) {
     return res.status(400).json({ error: "User ID not found in session" });
   }

   try {
     const activity = await prisma.activity.create({
       data: {
         userId: session.user.id,
         page,
         action,
       },
     });

     res.status(200).json(activity);
   } catch (error) {
     res.status(500).json({ error: "Failed to log activity" });
   }
 } else {
   res.setHeader("Allow", ["POST"]);
   res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}
