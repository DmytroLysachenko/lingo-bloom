// src/db/task.ts
import { prisma } from "./prisma";

interface ICreateTask {
  languageId: number;
  languageLevelId: number;
  taskPurposeId: number;
  taskTypeId: number;
  taskTopicId?: number;
  grammarRuleId?: number;
  data: string;
}

interface IUpdateTask {
  id: number;
  languageId?: number;
  languageLevelId?: number;
  taskTypeId?: number;
  taskTopicId?: number;
  taskPurposeId?: number;
  grammarRuleId?: number;
  data?: string;
}
export const findAllTasks = async () => {
  return prisma.task.findMany();
};

export const findTaskById = async (id: number) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

export const createTask = async (data: ICreateTask) => {
  return prisma.task.create({
    data,
  });
};

export const updateTask = async (id: number, data: IUpdateTask) => {
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
