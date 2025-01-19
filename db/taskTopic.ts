import { prisma } from "./prisma";

interface ITaskTopic {
  name: string;
}

export const findAllTaskTopics = async () => {
  return prisma.taskTopic.findMany();
};

export const findTaskTopicById = async (id: number) => {
  return prisma.taskTopic.findUnique({
    where: { id },
  });
};

export const createTaskTopic = async (data: ITaskTopic) => {
  return prisma.taskTopic.create({
    data,
  });
};

export const updateTaskTopic = async (id: number, data: ITaskTopic) => {
  return prisma.taskTopic.update({
    where: { id },
    data,
  });
};

export const deleteTaskTopic = async (id: number) => {
  return prisma.taskTopic.delete({
    where: { id },
  });
};
