// src/db/test.ts
import { prisma } from "./prisma";

interface ITest {
  userId: string;
  completedAt?: Date;
  status: "in-progress" | "completed";
  totalTasks: number;
  progress: number;
  score?: number;
}

export const findAllTests = async () => {
  return prisma.test.findMany();
};

export const findTestById = async (id: string) => {
  return prisma.test.findUnique({
    where: { id },
  });
};

export const createTest = async (data: ITest) => {
  return prisma.test.create({
    data,
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
