import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../utils/prisma";

export const linkRouter = trpc
  .router()
  .query("all", {
    input: z.string().optional(),
    async resolve({ input }) {
      return await prisma.shortLink.findMany({
        where: {
          userId: input,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      id: z.string(),
      slug: z.string(),
      url: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.shortLink.create({
        data: {
          userId: input.id,
          slug: input.slug,
          url: input.url,
        },
      });
    },
  })
  .query("check", {
    input: z.object({
      id: z.string().optional(),
      slug: z.string(),
    }),
    async resolve({ input }) {
      const count = await prisma.shortLink.count({
        where: {
          slug: input.slug,
        },
      });
      return count > 0;
    },
  })
  .mutation("delete", {
    input: z.number(),
    async resolve({ input }) {
      console.log("hI");
      return await prisma.shortLink.delete({
        where: {
          id: input,
        },
      });
    },
  });
