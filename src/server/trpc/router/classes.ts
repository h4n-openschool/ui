import { classesApi } from '../../../utils/api';

import { router, protectedProcedure } from "../trpc";

export const classesRouter = router({
  all: protectedProcedure
    .query(async ({ ctx: { session } }) => {
      const api = classesApi(session.user.token);
      const classes = await api.classesList(10, 1, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        }
      });
      return classes.data;
    }),

  create: protectedProcedure
    .query(async ({ ctx: { session } }) => {
      const api = classesApi(session.user.token);
      const newClass = await api.classesCreate({
        displayName: 'Maths 101',
        description: 'A simple Mathematics class.',
      })
    })
});
