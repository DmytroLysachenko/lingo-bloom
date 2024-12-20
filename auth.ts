import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  ...authConfig,
});
