import OpenAI from "openai";
import { generateGrammarRulePrompt, generateTestTaskPrompt } from "./prompts";
import { LANGUAGE_LEVELS, LANGUAGES } from "@/constants";

interface GenerateTaskParams {
  languageCode: string;
  languageLevel: string;
  taskPurpose: string;
  grammarRuleTitle?: string;
  taskTopic?: string;
}

const openai = new OpenAI();

export const generateGrammarRule = async (
  language: string,
  existingRulesTitles: string[]
) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content:
          "You are AI for generation data, so all replies should be in json format only. ",
      },
      {
        role: "user",
        content: generateGrammarRulePrompt(language, existingRulesTitles),
      },
    ],
  });

  return response;
};

// generateTestTask('pl', 'A1', 'Something', 'Travel', 'Grammar')

export const generateTestTask = async ({
  languageCode,
  languageLevel,
  taskPurpose,
  grammarRuleTitle,
  taskTopic,
}: GenerateTaskParams) => {
  const { langId, langName } = LANGUAGES[languageCode.toLowerCase()];

  const languageLevelId = LANGUAGE_LEVELS[languageLevel];

  const prompt = generateTestTaskPrompt(
    langName,
    languageLevel,
    taskPurpose,
    grammarRuleTitle,
    taskTopic
  );
};
