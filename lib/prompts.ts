import { GrammarRuleTranslation } from "@/types";
import { TaskType } from "@prisma/client";

interface GenerateTaskPromptParams {
  language: string;
  languageLevel: string;
  taskType: TaskType;
  quantity: number;
  taskTopic?: string;
  grammarRule?: GrammarRuleTranslation;
}

export const generateGrammarRulePrompt = (
  language: string,
  existingTitles: string[] | null
) => `
  Generate a grammar rule JSON object for the ${language} language. 
  Return the object **only**, without any additional text, explanation, or formatting. 

  Follow this schema:
  {
      "en": {
          "title": "Detailed grammar rule name in English",
          "description": "Comprehensive and detailed explanation in English, suitable for non-native speakers.",
          "example": "Examples in ${language} language, with English comments only when needed to explain context or clarify usage."
      },
      "pl": {
          "title": "Detailed grammar rule name in Polish",
          "description": "Comprehensive and detailed explanation in Polish, suitable for non-native speakers.",
          "example": "Examples in ${language} language with Polish comments only when needed to explain context or clarify usage."
      },
      "uk": {
          "title": "Detailed grammar rule name in Ukrainian",
          "description": "Comprehensive and detailed explanation in Ukrainian, suitable for non-native speakers.",
          "example": "Examples in ${language} language with Ukrainian comments only when needed to explain context or clarify usage."
      }
  }

  Ensure the following:
  - The response must be **valid JSON**.
  - Examples must be in ${language}.
  - The rule must not repeat titles in this list: ${JSON.stringify(
    existingTitles
  )}.
  - Do not include any additional text outside of the JSON object.
`;

export const generateTaskPrompt = ({
  language,
  languageLevel,
  taskType,
  taskTopic,
  grammarRule,
  quantity,
}: GenerateTaskPromptParams) => `
Generate ${quantity} ${
  taskType.name
} tasks for ${languageLevel} learners of ${language}. 

Details for the task:

- Purpose: ${taskType.promptPurpose}
${taskTopic ? `- Topic: ${taskTopic}` : ""}
${
  grammarRule
    ? `- Grammar Rule: ${grammarRule.title}
- Description: ${grammarRule.description}
- Examples: ${grammarRule.example}`
    : ""
}

Follow this schema strictly:

${JSON.stringify(taskType.promptSchema)}

Task examples: 
${JSON.stringify(taskType.promptExample)}


Additional Guidelines:
1. Write in **${language}** only.
2. Follow the JSON schema strictly.
3. Do not add extra text or comments.
4. Reply should be an array of objects.
${taskType.promptComments.join("; ")}
`;
