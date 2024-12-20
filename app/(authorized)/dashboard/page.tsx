import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();

  console.log(session);

  if (!session?.user) return redirect("/login");

  return <div>Dashboard</div>;
};

export default Dashboard;
