import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(({ ctx: { session } }) => {
    return `you can now see this secret message, ${session.user.name}!`;
  }),
});
