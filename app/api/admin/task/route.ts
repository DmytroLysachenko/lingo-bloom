import { findGrammarRuleById } from "@/db/grammarRule";
import { findLanguageById } from "@/db/language";
import { findLanguageLevelById } from "@/db/languageLevel";
import { createTask, deleteTask, updateTask } from "@/db/task";
import { findTaskPurposeById } from "@/db/taskPurpose";
import { findTaskTopicById } from "@/db/taskTopic";
import { findTaskTypeById } from "@/db/taskType";
import { generateTask } from "@/lib/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const languageId = Number(body.languageId);
  const languageLevelId = Number(body.languageLevelId);
  const taskTopicId = Number(body.taskTopicId);
  const taskTypeId = Number(body.taskTypeId);
  const taskPurposeId = Number(body.taskPurposeId);
  const grammarRuleId = Number(body.grammarRuleId);

  const [language, languageLevel, taskType, taskPurpose] = await Promise.all([
    findLanguageById(languageId),
    findLanguageLevelById(languageLevelId),
    findTaskTypeById(taskTypeId),
    findTaskPurposeById(taskPurposeId),
  ]);

  if (!language)
    return NextResponse.json(
      { message: `There is no language with such id: ${languageId}` },
      { status: 400 }
    );

  if (!languageLevel)
    return NextResponse.json(
      {
        message: `There is no language level with such id: ${languageLevelId}`,
      },
      { status: 400 }
    );

  if (!taskType)
    return NextResponse.json(
      { message: `There is no task type with such id: ${taskTypeId}` },
      { status: 400 }
    );

  if (!taskPurpose)
    return NextResponse.json(
      { message: `There is no task purpose with such id: ${taskPurposeId}` },
      { status: 400 }
    );

  const grammarRule =
    taskPurpose.name === "Grammar" && grammarRuleId
      ? await findGrammarRuleById(grammarRuleId)
      : undefined;

  const grammarRuleTitle = grammarRule
    ? await JSON.parse(grammarRule.data as string).en.title
    : undefined;

  const taskTopic = taskTopicId
    ? (await findTaskTopicById(taskTopicId))?.name
    : undefined;

  const response = await generateTask({
    language: language.name,
    languageLevel: languageLevel.name,
    taskPurpose: taskPurpose.name,
    taskType: taskType.name,
    taskTopic,
    grammarRuleTitle,
  });

  const newTask = await createTask({
    languageId,
    languageLevelId,
    taskPurposeId,
    taskTypeId,
    taskTopicId,
    grammarRuleId,
    data: response ?? "",
  });

  return NextResponse.json(
    {
      message: `Successfully created new task for ${language.name} language.`,
      newTask,
    },
    { status: 200 }
  );
}

export async function PATCH(request: NextRequest) {
  const data = await request.json();

  const updatedTask = await updateTask(data.id, { ...data });

  return NextResponse.json(
    { message: "Successfully approved new task.", updatedTask },
    { status: 200 }
  );
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();

  await deleteTask(data.id);

  return NextResponse.json({ status: 204 });
}
