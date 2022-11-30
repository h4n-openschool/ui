import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authApi } from "../../../utils/api";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  callbacks: {
    jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          token: user.token,
        }
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.token = token.token;
      }
      return session;
    }
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john.doe@school.edu" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const api = authApi();

        const res = await api.authLogin({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (res.status == 200) {
          const { token } = res.data;
          const user = await api.authCurrentUser({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.status == 200) {
            const { data } = user;

            return {
              id: data.id,
              email: data.email,
              name: data.fullName,
              token: token,
              type: 'teacher',
            };
          }

          return null;
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
