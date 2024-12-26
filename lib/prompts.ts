export const generateGrammarRulePrompt = (
  language: string,
  existingTitles: string[] | null
) => `
  Generate a grammar rule JSON object for the ${language} language. Follow this schema:
  {
      en: {
        title: "Title in English",
        description: "Comprehensive and Detailed explanation in English",
        example: "Example in ${language} language with English comment if needed"
      },
      pl: {
        title: "Title in Polish",
        description: "Comprehensive and Detailed explanation in Polish",
        example: "Example in ${language} language with Polish comment if needed"
      },
      uk: {
        title: "Title in Ukrainian",
        description: "Comprehensive and Detailed explanation in Ukrainian",
        example: "Example in ${language} language with Ukrainian comment if needed"
      }
  }
  Ensure the title is unique and does not repeat from the following list: ${JSON.stringify(
    existingTitles
  )}.

  This rule should be extensive enough for non-native speakers to understand how it works.

  Generate only the JSON object.
  `;

export const generateTestTaskPrompt = ({
  language,
  languageLevel,
  taskPurpose,
  grammarRuleTitle,
  taskTopic,
  quantity = 2,
}: {
  language: string;
  languageLevel: string;
  taskPurpose: string;
  taskTopic?: string;
  grammarRuleTitle?: string;
  quantity?: number;
}) => `
  Generate ${quantity} test tasks for the ${language} language with the following details:

  - Language Level: ${languageLevel}
  - Purpose: ${taskPurpose}
  ${taskTopic ? `- Topic: ${taskTopic}` : ""}
  ${grammarRuleTitle ? `- On Grammar rule: ${grammarRuleTitle}` : ""}

  Follow this JSON schema for the task:
    {
      question: "The task's question in ${language}",
      answers: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Correct answer from the options"
    }
  
  Generate only the JSON object, strictly adhering to the schema.
`;
