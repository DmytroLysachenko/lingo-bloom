import { TaskData, UpdateTask } from "@/schemas";
import { prisma } from "./prisma";
interface ICreateTask {
  languageId: number;
  languageLevelId: number;
  taskPurposeId: number;
  taskTypeId: number;
  taskTopicId?: number | null;
  grammarRuleId?: number | null;
  data: TaskData;
}

export const findAllTasks = async () => {
  return prisma.task.findMany();
};

export const findAllTasksByIdsArray = async (idArray: number[]) => {
  return prisma.task.findMany({
    where: {
      id: {
        in: idArray,
      },
    },
  });
};

export const findTasksWithDiversity = async ({
  languageId,
  languageLevelId,
  quantity,
}: {
  languageId: number;
  languageLevelId: number;
  quantity: number;
}) => {
  const tasks = await prisma.task.findMany({
    where: {
      languageId,
      languageLevelId,
    },
    take: quantity,
  });

  const shuffledTasks = shuffleArray(tasks);
  return shuffledTasks.slice(0, quantity);
};

const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const findTaskById = async (id: number) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

export const createTask = async (data: ICreateTask) => {
  const {
    languageId,
    languageLevelId,
    taskPurposeId,
    taskTypeId,
    taskTopicId,
    grammarRuleId,
    data: jsonData,
  } = data;

  return prisma.task.create({
    data: {
      language: {
        connect: { id: languageId },
      },
      languageLevel: {
        connect: { id: languageLevelId },
      },
      taskPurpose: {
        connect: { id: taskPurposeId },
      },
      taskType: {
        connect: { id: taskTypeId },
      },
      taskTopic: taskTopicId ? { connect: { id: taskTopicId } } : undefined,
      grammarRule: grammarRuleId
        ? { connect: { id: grammarRuleId } }
        : undefined,
      data: jsonData,
    },
  });
};

export const updateTask = async (id: number, newTask: UpdateTask) => {
  const {
    languageId,
    languageLevelId,
    taskPurposeId,
    taskTypeId,
    taskTopicId,
    grammarRuleId,
    checked,
    data,
  } = newTask;

  return prisma.task.update({
    where: { id },
    data: {
      language: {
        connect: { id: languageId },
      },
      languageLevel: {
        connect: { id: languageLevelId },
      },
      taskPurpose: {
        connect: { id: taskPurposeId },
      },
      taskType: {
        connect: { id: taskTypeId },
      },
      taskTopic: taskTopicId ? { connect: { id: taskTopicId } } : undefined,
      grammarRule: grammarRuleId
        ? { connect: { id: grammarRuleId } }
        : undefined,
      data,
      checked,
    },
  });
};

export const deleteTask = async (id: number) => {
  return prisma.task.delete({
    where: { id },
  });
};
