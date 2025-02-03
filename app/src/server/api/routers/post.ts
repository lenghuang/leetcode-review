import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      console.log(input);

      const response = await ctx.db.from("T3AppStarterPosts").insert({
        name: input.name,
        user_id: ctx.session.user.id,
      });

      console.log("\ncreate");
      console.log(response);

      return response;
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const response = await ctx.db
      .from("T3AppStarterPosts")
      .select("*")
      .eq("user_id", ctx.session.user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    console.log("\nget latest");
    console.log(response);

    return response?.data ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
