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
    completeTask: (taskId: number, score: number) => void;
  };
  children: React.ReactNode;
}) => {
  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export default TestContextProvider;
