import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  session: {
    maxAge: 60 * 15,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
});
