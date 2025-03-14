import { auth } from "@/auth";
import { findAllTasksByIdsArray } from "@/db/task";
import { findTestById } from "@/db/test";
import { taskArray, testSchema } from "@/schemas";
import TestContextProvider from "@components/providers/testContext";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Polish test page",
  description: "Generated by Lingo Bloom",
};

const TestLayout = async ({
  params,
  children,
}: {
  params: Promise<{ testId: string }>;
  children: React.ReactNode;
}) => {
  const { testId } = await params;

  const session = await auth();

  if (!session) return redirect("/login");

  const { id: userId } = session.user;

  const test = await findTestById(testId, userId);

  if (!test) return redirect("/dashboard");

  const parsedTest = testSchema.parse(test);

  const tasksIdArray = parsedTest.tasks.map((task) => task.taskId);

  const tasks = await findAllTasksByIdsArray(tasksIdArray);

  const parsedTasks = taskArray.parse(tasks);

  return (
    <TestContextProvider value={{ test: parsedTest, tasks: parsedTasks }}>
      {children}
    </TestContextProvider>
  );
};

export default TestLayout;
