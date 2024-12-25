// src/db/task.ts
import { prisma } from "./prisma";

interface ITask {
  languageId: number;
  languageLevelId: number;
  taskTypeId: number;
  taskTopicId: number;
  taskPurposeId: number;
  grammarRuleId: number;
  data: string;
}

export const findAllTasks = async () => {
  return prisma.task.findMany();
};

export const findTaskById = async (id: number) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

export const createTask = async (data: ITask) => {
  return prisma.task.create({
    data,
  });
};

export const updateTask = async (id: number, data: ITask) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTask = async (id: number) => {
  return prisma.task.delete({
    where: { id },
  });
};
