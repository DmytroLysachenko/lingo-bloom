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
  Generate only the JSON object.
  `;

export const generateTestTaskPrompt = (
  language: string,
  level: string,
  taskPurpose: string,
  grammarRuleTitle: string | null,
  taskTopic: string | null
) => `
  Generate a test task for the ${language} language with the following details:

  - Language Level: ${level}
  - Purpose: ${taskPurpose}
  ${taskTopic ? `- Topic: ${taskTopic}` : ""}
  ${grammarRuleTitle ? `- On Grammar rule: ${grammarRuleTitle}` : ""}

  Follow this JSON schema for the task:
  {
    title: "Task title in ${language}",
    description: "Detailed description of the task in ${language}",

    data: {
      level: "${level}",
      language: "${language}",
      taskDescription: {
        en: "Task description in English",
        uk: "Task description in Ukrainian",
        pl: "Task description in Polish"
      },
      question: "The task's question in ${language}",
      answers: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Correct answer from the options"
    }
  }
    
  Generate only the JSON object, strictly adhering to the schema.
`;
