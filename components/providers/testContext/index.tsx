"use client";

import { Task, Test } from "@/schemas";
import { createContext } from "react";

export const TestContext = createContext<null | {
  test: Test;
  tasks: Task[];
  completeTask: (taskId: number, score: number) => void;
}>(null);

import React from "react";

const TestContextProvider = ({
  value,
  children,
}: {
  value: {
    test: Test;
    tasks: Task[];
  };
  children: React.ReactNode;
}) => {
  const completeTask = (taskId: number, score: number) => {
    value.test.tasks = [
      ...value.test.tasks.filter((task) => task.taskId !== taskId),
      { taskId, score, isCompleted: true },
    ];
  };

  return (
    <TestContext.Provider value={{ ...value, completeTask }}>
      {children}
    </TestContext.Provider>
  );
};

export default TestContextProvider;
