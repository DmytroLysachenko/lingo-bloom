import OpenAI from "openai";
import { generateGrammarRulePrompt, generateTestTaskPrompt } from "./prompts";

interface GenerateTaskParams {
  language: string;
  languageLevel: string;
  taskPurpose: string;
  taskType: string;
  taskTopic?: string;
  grammarRuleTitle?: string;
}

const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  project: process.env.OPENAI_PROJECT_ID,
});

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
          "You are assistant for generation JSON data. You always return valid JSON object without additional description or context. ",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};

// generateTestTask({'pl', 'A1', 'Grammar', 'Something',  'Travel'} )

export const generateTask = async ({
  language,
  languageLevel,
  taskPurpose,
  taskType,
  grammarRuleTitle,
  taskTopic,
}: GenerateTaskParams) => {
  const prompt = generateTestTaskPrompt({
    language,
    languageLevel,
    taskPurpose,
    taskTopic,
    taskType,
    grammarRuleTitle,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content:
          "You are assistant for generation JSON data. You always return valid JSON object without additional description or context. ",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};
