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
          "description": "Provide a comprehensive explanation in English that includes the specific usage of the grammar rule, real-life use cases, common mistakes, and exceptions. The explanation should be clear for non-native speakers and must include guidance on how to apply the rule in different contexts (e.g., singular/plural, tense, mood).",
          "example": "Provide examples in ${language} language, including both singular and plural forms (if applicable), and different cases, tenses, or moods. Use English comments only when necessary to clarify context or usage."
      },
      "pl": {
          "title": "Detailed grammar rule name in Polish",
          "description": "Provide a comprehensive explanation in Polish that includes the specific usage of the grammar rule, real-life use cases, common mistakes, and exceptions. The explanation should be clear for non-native speakers and must include guidance on how to apply the rule in different contexts (e.g., singular/plural, tense, mood).",
          "example": "Provide examples in ${language} language, including both singular and plural forms (if applicable), and different cases, tenses, or moods. Use Polish comments only when necessary to clarify context or usage."
      },
      "uk": {
          "title": "Detailed grammar rule name in Ukrainian",
          "description": "Provide a comprehensive explanation in Ukrainian that includes the specific usage of the grammar rule, real-life use cases, common mistakes, and exceptions. The explanation should be clear for non-native speakers and must include guidance on how to apply the rule in different contexts (e.g., singular/plural, tense, mood).",
          "example": "Provide examples in ${language} language, including both singular and plural forms (if applicable), and different cases, tenses, or moods. Use Ukrainian comments only when necessary to clarify context or usage."
      }
  }

  Ensure the following:
  - Examples must be in ${language}.
  - The rule must not repeat titles in this list: ${JSON.stringify(
    existingTitles
  )}.
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

**Important** task-specific Guidelines:
${taskType.promptComments.join("; ")}

Additional Guidelines:
1. Write in **${language}** only.
2. Follow the JSON schema strictly.
3. Do not add extra text or comments.
4. Reply should be an array of objects.
`;
