import { type DefaultSession, type JWT } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      token: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    type: 'teacher' | 'parent';
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
  }
}
