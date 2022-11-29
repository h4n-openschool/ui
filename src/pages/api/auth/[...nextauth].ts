import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fetch from 'node-fetch';

import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john.doe@school.edu" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const res = await fetch(`${env.OPENSCHOOL_API_URL}/v1/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const token = await res.json() as { token: string };

        if (res.ok && token) {
          const res = await fetch(`${env.OPENSCHOOL_API_URL}/v1/auth/me`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          });
          const user = await res.json() as { id: string, email: string, fullName: string };
          console.log(user);

          if (res.ok && user) {
            return user;
          }

          return null;
        }

        return null;
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
