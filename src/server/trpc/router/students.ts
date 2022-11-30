import { studentsApi } from '../../../utils/api';

import { router, protectedProcedure } from "../trpc";

export const studentsRouter = router({
  all: protectedProcedure
    .query(async ({ ctx: { session } }) => {
      const api = studentsApi(session.user.token);
      const students = await api.studentsList(10, 1, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        }
      });
      return students.data;
    }),
});
