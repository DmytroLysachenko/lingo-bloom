import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
      createdAt: Date;
    } & DefaultSession["user"];
  }

  interface JWT {
    role?: string;
  }

  interface User {
    role?: string;
    password?: string | null;
    createdAt?: Date;
  }
}
