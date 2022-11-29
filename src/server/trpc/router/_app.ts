import { router } from "../trpc";
import { authRouter } from "./auth";
import { classesRouter } from "./classes";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  classes: classesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
