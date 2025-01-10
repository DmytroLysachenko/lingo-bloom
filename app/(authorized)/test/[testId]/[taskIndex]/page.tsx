"use client";

import { Task, Test } from "@/schemas";
import TestPage from "@components/pages/TestPage";
import { TestContext } from "@components/providers/testContext";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { taskIndex } = useParams();

  const { test, tasks } = React.useContext(TestContext) as {
    test: Test;
    tasks: Task[];
  };

  return (
    <TestPage
      test={test}
      task={tasks[Number(taskIndex)]}
      taskIndex={Number(taskIndex)}
    />
  );
};

export default Page;
