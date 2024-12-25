import OpenAI from "openai";
import { generateGrammarRulePrompt, generateTestTaskPrompt } from "./prompts";

interface GenerateTaskParams {
  language: string;
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

// generateTestTask({'pl', 'A1', 'Grammar', 'Something',  'Travel'} )

export const generateTestTask = async ({
  language,
  languageLevel,
  taskPurpose,
  grammarRuleTitle,
  taskTopic,
}: GenerateTaskParams) => {
  const prompt = generateTestTaskPrompt({
    language,
    languageLevel,
    taskPurpose,
    taskTopic,
    grammarRuleTitle,
  });

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
        content: prompt,
      },
    ],
  });

  return response;
};
