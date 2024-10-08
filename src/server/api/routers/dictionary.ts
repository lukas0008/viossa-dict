import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { definitions } from "~/server/db/schema";
import { eq, and, count } from "drizzle-orm";

export const dictionaryRouter = createTRPCRouter({
  get_def: publicProcedure
    .input(z.object({ word: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) return;
      const q = await ctx.db
        .select()
        .from(definitions)
        .where(
          and(
            eq(definitions.word, input.word),
            eq(definitions.ownerId, ctx.session.user.id),
          ),
        );
      console.log(q);
      return q.length > 0
        ? {
            word: q[0]!.word,
            definition: q[0]?.definition,
          }
        : undefined;
    }),
  post_def: publicProcedure
    .input(z.object({ word: z.string(), definition: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) return;

      const q = await ctx.db
        .insert(definitions)
        .values({
          ownerId: ctx.session.user.id,
          word: input.word,
          definition: input.definition,
        })
        .onConflictDoUpdate({
          target: [definitions.ownerId, definitions.word],
          set: { definition: input.definition },
        });
    }),
  list_defs: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input }) => {
      const PAGE_SIZE = 50;
      if (!ctx.session) return;

      const q = await ctx.db
        .select()
        .from(definitions)
        .where(eq(definitions.ownerId, ctx.session.user.id))
        .orderBy(definitions.word)
        .limit(PAGE_SIZE)
        .offset(PAGE_SIZE * input.page);

      return q.map((v) => v.word);
    }),
  def_pages: publicProcedure.query(async ({ ctx }) => {
    const PAGE_SIZE = 50;

    if (!ctx.session) return;

    const q = await ctx.db
      .select({ count: count() })
      .from(definitions)
      .where(eq(definitions.ownerId, ctx.session.user.id));

    return q[0]?.count;
  }),
});
