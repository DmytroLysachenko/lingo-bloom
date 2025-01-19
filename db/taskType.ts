import { prisma } from "./prisma";

interface ITaskType {
  name: string;
  promptSchema: string;
  taskPurposeId: number;
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
  const { name, promptSchema, taskPurposeId } = data;

  return prisma.taskType.create({
    data: {
      name,
      promptSchema,
      taskPurpose: {
        connect: { id: taskPurposeId },
      },
    },
  });
};

export const updateTaskType = async (id: number, data: ITaskType) => {
  const { name, promptSchema, taskPurposeId } = data;

  return prisma.taskType.update({
    where: { id },
    data: {
      name,
      promptSchema,
      taskPurpose: {
        connect: { id: taskPurposeId },
      },
    },
  });
};

export const deleteTaskType = async (id: number) => {
  return prisma.taskType.delete({
    where: { id },
  });
};
