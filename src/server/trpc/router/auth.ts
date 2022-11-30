import { authApi } from "../../../utils/api";
import { router, protectedProcedure } from "../trpc";

export const authRouter = router({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const api = authApi(ctx.session.user.token);
    const res = await api.authCurrentUser();
    return res.data;
  }),
});
