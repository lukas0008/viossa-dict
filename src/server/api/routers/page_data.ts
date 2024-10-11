import { count, eq } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { definitions } from "~/server/db/schema";

export const pageDataRouter = createTRPCRouter({
  profile: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) return;

    const wordCount = await ctx.db
      .select({ count: count() })
      .from(definitions)
      .where(eq(definitions.ownerId, ctx.session.user.id));

    return {
      wordCount: wordCount[0]!.count,
    };
  }),
});
