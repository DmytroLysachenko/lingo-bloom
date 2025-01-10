// src/db/test.ts
import { prisma } from "./prisma";

interface ITest {
  userId: string;
  completedAt?: Date;
  status?: "in-progress" | "completed";
  totalTasks: number;
  progress?: number;
  tasks: { id: number }[];
}

export const findAllTests = async (userId: string) => {
  return prisma.test.findMany({ where: { userId } });
};

export const findAllCompletedTests = async (userId: string) => {
  return prisma.test.findMany({
    where: { userId, completedAt: { not: null } },
  });
};

export const findAllCurrentTests = async (userId: string) => {
  return prisma.test.findMany({ where: { userId, status: "in-progress" } });
};

export const findTestById = async (testId: string, userId: string) => {
  console.log("FETCH");
  return prisma.test.findUnique({
    where: { id: testId, userId },
  });
};

export const createTest = async (data: ITest) => {
  const { userId, totalTasks, tasks } = data;
  return prisma.test.create({
    data: {
      userId,
      totalTasks,
      status: "in-progress",
      progress: 0,
      tasks: tasks.map((task) => ({
        taskId: task.id,
        status: "in-progress",
      })),
    },
  });
};

export const updateTest = async (id: string, data: ITest) => {
  return prisma.test.update({
    where: { id },
    data,
  });
};

export const deleteTest = async (id: string) => {
  return prisma.test.delete({
    where: { id },
  });
};
