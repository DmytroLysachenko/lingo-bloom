// src/db/taskProgress.ts
import { prisma } from "./prisma";

interface ITaskProgress {
  userId: string;
  taskId: number;
  status: "not-started" | "in-progress" | "completed";
  tries?: number;
  score?: number;
  completedAt?: Date;
}

export const findAllTaskProgress = async () => {
  return prisma.taskProgress.findMany();
};

export const findTaskProgressById = async (id: string) => {
  return prisma.taskProgress.findUnique({
    where: { id },
  });
};

export const createTaskProgress = async (data: ITaskProgress) => {
  return prisma.taskProgress.create({
    data,
  });
};

export const updateTaskProgress = async (id: string, data: ITaskProgress) => {
  return prisma.taskProgress.update({
    where: { id },
    data,
  });
};

export const deleteTaskProgress = async (id: string) => {
  return prisma.taskProgress.delete({
    where: { id },
  });
};
