import { router } from "../trpc";
import { authRouter } from "./auth";
import { classesRouter } from "./classes";
import { studentsRouter } from "./students";

export const appRouter = router({
  auth: authRouter,
  classes: classesRouter,
  students: studentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
