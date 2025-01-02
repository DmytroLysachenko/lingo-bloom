import OpenAI from "openai";
import { generateGrammarRulePrompt, generateTaskPrompt } from "./prompts";
import { GrammarRuleTranslation } from "@/types";
import { Language, LanguageLevel, TaskTopic, TaskType } from "@prisma/client";

interface GenerateTaskParams {
  language: Language;
  languageLevel: LanguageLevel;
  taskType: TaskType;
  grammarRule?: GrammarRuleTranslation;
  taskTopic?: TaskTopic | null;
}

export const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  project: process.env.OPENAI_PROJECT_ID,
});

const developerMessage =
  "You are an assistant for generating structured JSON data for language learning tasks. Always return a valid JSON object that follows the specified schema, without any additional text, explanation, or formatting. Your output should strictly adhere to the JSON format provided.";

//Grammar rules

export const generateGrammarRule = async (
  language: string,
  existingRulesTitles: string[]
) => {
  const prompt = generateGrammarRulePrompt(language, existingRulesTitles);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content:
          "You are an assistant for generating JSON data. Always return a valid JSON object, without any additional text, explanation, or formatting.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message
    .content!.replaceAll("```json", "")
    .replaceAll("`", "");
};

export const generateTask = async ({
  language,
  languageLevel,
  taskType,
  grammarRule,
  taskTopic,
}: GenerateTaskParams) => {
  const prompt = generateTaskPrompt({
    language: language.name,
    languageLevel: languageLevel.name,
    taskType,
    grammarRule,
    taskTopic: taskTopic?.name || undefined,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content: developerMessage,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(
    response.choices[0].message
      .content!.replaceAll("```json", "")
      .replaceAll("`", "")
  );

  return response.choices[0].message
    .content!.replaceAll("```json", "")
    .replaceAll("`", "");
};
