import { auth } from "@/auth";
import { findAllTasksByIdsArray } from "@/db/task";
import { findTestById } from "@/db/test";
import { taskArray } from "@/schemas";
import { testSchema } from "@/schemas/testScheme";
import TestPage from "@components/pages/TestPage";
import { redirect } from "next/navigation";
import React from "react";

const Test = async ({ params }: { params: Promise<{ testId: string }> }) => {
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
    <TestPage
      test={parsedTest}
      tasks={parsedTasks}
    />
  );
};

export default Test;
