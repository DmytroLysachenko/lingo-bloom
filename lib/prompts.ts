export const generateGrammarRulePrompt = (
  language: string,
  existingTitles: string[] | null
) => `
  Generate a grammar rule JSON object for the ${language} language. Follow this schema:
  {
      en: {
        title: "Detailed grammar rule name in English",
        description: "Comprehensive and Detailed rule explanation in English",
        example: "Examples in ${language} language with English comments if needed"
      },
      pl: {
        title: "Detailed grammar rule name in Polish",
        description: "Comprehensive and Detailed explanation in Polish",
        example: "Example in ${language} language with Polish comments if needed"
      },
      uk: {
        title: "Detailed grammar rule name in Ukrainian",
        description: "Comprehensive and Detailed explanation in Ukrainian",
        example: "Example in ${language} language with Ukrainian comments if needed"
      }
  }

  Ensure the rule does not repeat any from the following list: ${JSON.stringify(
    existingTitles
  )}.

  This rule should be extensive enough for non-native speakers to understand how to use it in daily communication.
  `;

export const generateTestTaskPrompt = ({
  language,
  languageLevel,
  taskPurpose,
  taskType,
  taskTopic,
  grammarRuleTitle,
}: {
  language: string;
  languageLevel: string;
  taskPurpose: string;
  taskType: string;
  taskTopic?: string;
  grammarRuleTitle?: string;
}) => `
  Generate ${taskType} task for the ${language} language with the following details:

  - Approximate task's Language Level: ${languageLevel}
  - Purpose: ${taskPurpose}
  ${grammarRuleTitle ? `- On Grammar rule: ${grammarRuleTitle}` : ""}
  ${taskTopic ? `- Topic: ${taskTopic}` : ""}


  Follow this schema:
    {
      question: "The task's question in ${language} language",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
      correctAnswer: "Answer 2"
    }
`;
