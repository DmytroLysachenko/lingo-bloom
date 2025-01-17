import DashboardPage from "@components/pages/DashboardPage";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { findAllTests } from "@/db/test";
import { testArraySchema } from "@/schemas/testScheme";

const Dashboard = async () => {
  const session = await auth();

  if (!session) return redirect("/login");

  const tests = await findAllTests(session.user.id);

  const parsedTests = testArraySchema.parse(tests);

  return (
    <DashboardPage
      user={session.user}
      tests={parsedTests}
    />
  );
};

export default Dashboard;
