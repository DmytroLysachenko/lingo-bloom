import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
});
