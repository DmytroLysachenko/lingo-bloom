// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Example: Google authentication

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Add more providers as needed
  ],
  callbacks: {
    async jwt({ token, account }) {
      // You can add custom logic to your JWT here if needed
      return token;
    },
    async session({ session, token }) {
      // Customize session if needed
      return session;
    },
  },
  secret: process.env.JWT_SECRET, // Optional: add a secret for JWT signing
};

export default NextAuth(authOptions);
