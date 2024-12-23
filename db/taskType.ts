// src/db/taskType.ts
import { prisma } from "./prisma";

interface ITaskType {
  name: string;
}

export const findAllTaskTypes = async () => {
  return prisma.taskType.findMany();
};

export const findTaskTypeById = async (id: number) => {
  return prisma.taskType.findUnique({
    where: { id },
  });
};

export const createTaskType = async (data: ITaskType) => {
  return prisma.taskType.create({
    data,
  });
};

export const updateTaskType = async (id: number, data: ITaskType) => {
  return prisma.taskType.update({
    where: { id },
    data,
  });
};

export const deleteTaskType = async (id: number) => {
  return prisma.taskType.delete({
    where: { id },
  });
};
