import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        console.log(user);
        session.user = user;
      }
      return session;
    },
  },
  debug: true,
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      checks: ["none"],
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
};

export default NextAuth(authOptions);
