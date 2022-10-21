import { NextApiRequest, NextApiResponse, NextPage } from "next";
import { prisma } from "@/backend/utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];
  if (!slug || typeof slug !== "string")
    return res.status(400).send("A slug needs to be specified.");

  const data = await prisma.shortLink.findFirst({
    where: {
      slug,
    },
  });

  if (!data) return res.status(404).send("Slug not found.");

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  return res.json(data);
};
