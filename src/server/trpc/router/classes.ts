import { ClassesApi, Configuration } from "../../../api";
import { env } from "../../../env/server.mjs";

import { router, protectedProcedure } from "../trpc";

export const classesRouter = router({
  all: protectedProcedure
    .query(async ({ ctx: { session } }) => {
      const classesApi = new ClassesApi(new Configuration({
        basePath: env.OPENSCHOOL_API_URL,
      }));

      const classes = await classesApi.classesList(10, 1, {
        headers: { 'Authorization': `Bearer ${session.user.token}` }
      });

      return {
        classes: classes.data,
      };
    }),
});
