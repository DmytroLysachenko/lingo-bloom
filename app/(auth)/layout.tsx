import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  if (session?.user) return redirect("/dashboard");

  return children;
};

export default Layout;
