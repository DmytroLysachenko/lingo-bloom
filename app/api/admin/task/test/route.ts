import {
  LANGUAGE_LEVELS,
  LANGUAGES,
  TASK_PURPOSES,
  TASK_TYPES,
} from "@/constants";
import { findAllLanguageGrammarRules } from "@/db/grammarRule";
import { createTask } from "@/db/task";
import { findAllTaskTopics } from "@/db/taskTopic";
import { generateTestTask } from "@/lib/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { languageCode, languageLevel, taskPurpose } = body;

  const { id: langId, name: langName } = LANGUAGES[languageCode];

  const createdTasks = [];

  switch (taskPurpose) {
    case "Grammar":
      const [taskTopics, grammarRules] = await Promise.all([
        findAllTaskTopics(),
        findAllLanguageGrammarRules(langId),
      ]);

      for (const rule of grammarRules) {
        const {
          en: { title: grammarRuleTitle },
        } = JSON.parse(rule.data as string);

        for (const topic of taskTopics) {
          const response = await generateTestTask({
            language: langName,
            languageLevel,
            taskPurpose,
            grammarRuleTitle,
            taskTopic: topic.name,
          });

          console.log(response.choices[0].message.content);

          const newTask = await createTask({
            languageId: langId,
            taskTypeId: TASK_TYPES.TEST,
            taskPurposeId: TASK_PURPOSES.GRAMMAR,
            taskTopicId: topic.id,
            languageLevelId: LANGUAGE_LEVELS[languageLevel],
            grammarRuleId: rule.id,
            data: response.choices[0].message.content as string,
          });

          createdTasks.push(newTask);
        }
      }

      break;

    default:
      break;
  }

  return NextResponse.json(
    {
      message: `Successfully created new tasks for ${langName} language.`,
      createdTasks,
    },
    { status: 200 }
  );
}

export async function GET() {}
