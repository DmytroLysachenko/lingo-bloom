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

export const findAllTests = async () => {
  return prisma.test.findMany();
};

export const findTestById = async (testId: string, userId: string) => {
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
