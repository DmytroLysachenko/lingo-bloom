// src/db/taskPurpose.ts
import { prisma } from "./prisma";

interface ITaskPurpose {
  name: string;
  prompt: string;
}

export const findAllTaskPurposes = async () => {
  return prisma.taskPurpose.findMany();
};

export const findTaskPurposeById = async (id: number) => {
  return prisma.taskPurpose.findUnique({
    where: { id },
  });
};

export const createTaskPurpose = async (data: ITaskPurpose) => {
  return prisma.taskPurpose.create({
    data,
  });
};

export const updateTaskPurpose = async (id: number, data: ITaskPurpose) => {
  return prisma.taskPurpose.update({
    where: { id },
    data,
  });
};

export const deleteTaskPurpose = async (id: number) => {
  return prisma.taskPurpose.delete({
    where: { id },
  });
};
