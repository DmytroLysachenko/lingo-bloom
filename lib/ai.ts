import OpenAI from "openai";
import { generateGrammarRulePrompt } from "./prompts";
import { JsonValue } from "@prisma/client/runtime/library";

interface GenerateTaskParams {
  language: string;
  languageLevel: string;
  taskPurposePrompt: string;
  taskTypePromptSchema: JsonValue;
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

  console.log(prompt);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content:
          "You are assistant for generation JSON data. You always return valid JSON object without additional description or context.",
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
  taskPurposePrompt,
  taskTypePromptSchema,
  grammarRuleTitle,
  taskTopic,
}: GenerateTaskParams) => {
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
        content: `
  Generate a test-type task for the ${language} language with the following details:

  - Approximate task's Language Level: ${languageLevel}
  - Purpose: ${taskPurposePrompt}
  ${grammarRuleTitle ? `- On Grammar rule: ${grammarRuleTitle}` : ""}
  ${taskTopic ? ` - Topic: ${taskTopic} ` : ""}

  Follow this schema:

  ${taskTypePromptSchema}
`,
      },
    ],
  });

  return response.choices[0].message.content;
};
