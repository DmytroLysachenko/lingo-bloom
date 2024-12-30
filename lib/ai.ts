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
    model: "gpt-4o",
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
    model: "gpt-4",
    messages: [
      {
        role: "developer",
        content:
          "You are an assistant for generating structured JSON data for language learning tasks. Always return a valid JSON object that follows the specified schema, without any additional text, explanation, or formatting. Your output should be strictly in JSON format as specified below. Focus on generating questions and answers that align with the context provided (language, level, grammar rule, task type, and topic).",
      },
      {
        role: "user",
        content: `
  Generate a task for the ${language} language with the following details:

  - Approximate task's Language Level: ${languageLevel}
  - Purpose: ${taskPurposePrompt}
  ${grammarRuleTitle ? `- On Grammar rule: ${grammarRuleTitle}` : ""}
  ${taskTopic ? ` - Topic: ${taskTopic}` : ""}

  Follow this schema exactly:

  ${JSON.stringify(taskTypePromptSchema)}

  Notes:
  - Ensure the question and answers are appropriate for the ${languageLevel} level.
  - The question should test the user's understanding of the grammar rule "${grammarRuleTitle}" (if applicable).
  - Ensure the topic ("${taskTopic}") is relevant to the question and answers.
  - The answers should have at least one correct option, and the "correctAnswer" should match one of the answers.
  - Avoid using unrelated answers or irrelevant content.
  - Ensure that the question and answers are in ${language}
`,
      },
    ],
  });

  return response.choices[0].message
    .content!.replaceAll("```json", "")
    .replaceAll("`", "");
};
