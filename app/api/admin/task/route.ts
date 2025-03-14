import { findGrammarRuleById } from "@/db/grammarRule";
import { findLanguageById } from "@/db/language";
import { findLanguageLevelById } from "@/db/languageLevel";
import { createTask, deleteTask, findTaskById, updateTask } from "@/db/task";
import { findTaskPurposeById } from "@/db/taskPurpose";
import { findTaskTopicById } from "@/db/taskTopic";
import { findTaskTypeById } from "@/db/taskType";
import { generateTask } from "@/lib/ai";
import { ApiError } from "@/lib/utils";
import {
  createTaskSchema,
  deleteTaskSchema,
  tasksDataArrayScheme,
  updateTaskSchema,
} from "@/schemas";
import { apiMiddleware } from "@components/providers/apiMiddleware";
import { Task } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = apiMiddleware(async (request: NextRequest) => {
  const body = await request.json();

  const parsedBody = createTaskSchema.parse(body);

  const {
    languageId,
    languageLevelId,
    taskTopicId,
    taskTypeId,
    taskPurposeId,
    grammarRuleId,
    quantity,
  } = parsedBody;

  const [language, languageLevel, taskType, taskPurpose] = await Promise.all([
    findLanguageById(languageId).catch(() => {
      throw new ApiError("Database error while fetching language data.", 500);
    }),
    findLanguageLevelById(languageLevelId).catch(() => {
      throw new ApiError(
        "Database error while fetching language level data.",
        500
      );
    }),
    findTaskTypeById(taskTypeId).catch(() => {
      throw new ApiError("Database error while fetching task type data.", 500);
    }),
    findTaskPurposeById(taskPurposeId).catch(() => {
      throw new ApiError(
        "Database error while fetching task purpose data.",
        500
      );
    }),
  ]);

  if (!language)
    throw new ApiError(`There is no language with such id: ${languageId}`, 404);

  if (!languageLevel)
    throw new ApiError(
      `There is no language level with such id: ${languageLevelId}`,
      404
    );

  if (!taskType)
    throw new ApiError(
      `There is no task type with such id: ${taskTypeId}`,
      404
    );

  if (!taskPurpose)
    throw new ApiError(
      `There is no task purpose with such id: ${taskPurposeId}`,
      404
    );

  const grammarRule =
    taskPurpose.name === "Grammar" && grammarRuleId
      ? await findGrammarRuleById(grammarRuleId).catch(() => {
          throw new ApiError(
            "Database error while fetching grammar rule.",
            500
          );
        })
      : undefined;
  if (taskPurpose.name === "Grammar" && grammarRuleId && !grammarRule)
    throw new ApiError(
      `There is no grammar rule with such id: ${grammarRuleId}`,
      404
    );

  const taskTopic = taskTopicId
    ? await findTaskTopicById(taskTopicId).catch(() => {
        throw new ApiError("Database error while fetching task topic.", 500);
      })
    : undefined;

  if (!taskTopic && taskTopicId)
    throw new ApiError(
      `There is no task topic with such id: ${taskTopicId}`,
      404
    );

  const data = await generateTask({
    language,
    languageLevel,
    taskTopic,
    taskType,
    grammarRule: grammarRule?.data.en,
    quantity,
  });

  if (!data)
    throw new ApiError(
      `Something went wrong during rule generation, try again later.`,
      500
    );

  const parsedData = tasksDataArrayScheme.parse(JSON.parse(data));
  const newTasks: Task[] = [];

  const createFewTasks = async () => {
    for (const taskData of parsedData) {
      const newTask = await createTask({
        languageId,
        languageLevelId,
        taskPurposeId,
        taskTypeId,
        taskTopicId: taskTopicId ?? null,
        grammarRuleId: grammarRuleId ?? null,
        data: taskData,
      }).catch(() => {
        throw new ApiError("Database error while creating task.", 500);
      });

      newTasks.push(newTask);
    }
  };

  await createFewTasks();

  return NextResponse.json(
    {
      message: `Successfully created new task for ${language.name} language.`,
      newTasks,
    },
    { status: 200 }
  );
});

export const PATCH = apiMiddleware(async (request: NextRequest) => {
  const body = await request.json();

  const parsedBody = updateTaskSchema.parse(body);

  const task = await findTaskById(parsedBody.id);

  if (!task)
    throw new ApiError(`There is no task with such id: ${parsedBody.id}`, 404);

  const updatedTask = await updateTask(parsedBody.id, {
    ...task,
    ...parsedBody,
  });

  return NextResponse.json(
    { message: "Successfully updated new task.", updatedTask },
    { status: 200 }
  );
});

export const DELETE = apiMiddleware(async (request: NextRequest) => {
  const body = await request.json();

  const parsedBody = deleteTaskSchema.parse(body);

  await deleteTask(parsedBody.id);

  return NextResponse.json({ status: 204 });
});
