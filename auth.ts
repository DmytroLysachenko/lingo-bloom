import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "./db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { findUserByEmail } from "./db/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        // Find user in the database
        const user = await findUserByEmail(email as string);

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (user.password === null)
          throw new Error(
            "This mail is registered through OAuth, try log in with google/github"
          );

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        // Return user object if valid
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // Include role for role-based access
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 15,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Ensure user role is stored in the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string; // Assign the role to the session
      }
      return session;
    },
  },
  pages: {
    error: "/auth-error",
  },
});
