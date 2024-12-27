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
  ;`;

export const generateTaskPrompt = ({
  language,
  languageLevel,
  taskPurpose,
  grammarRuleTitle,
  taskTopic,
  taskType,
}: {
  language: string;
  languageLevel: string;
  taskPurpose: string;
  taskType: string;
  grammarRuleTitle?: string;
  taskTopic?: string;
}) => {
  switch (taskType.toLowerCase()) {
    case "test":
      return generateTestTaskPrompt({
        language,
        languageLevel,
        taskPurpose,
        grammarRuleTitle,
        taskTopic,
      });

    case "connection":
      return generateConnectionTaskPrompt({
        language,
        languageLevel,
        taskPurpose,
        grammarRuleTitle,
        taskTopic,
      });
    case "fill-in-blank":
      return generateFillInBlankTaskPrompt({
        language,
        languageLevel,
        taskPurpose,
        grammarRuleTitle,
        taskTopic,
      });
    default:
      return "";
  }
};

//Test task
export const generateTestTaskPrompt = ({
  language,
  languageLevel,
  taskPurpose,
  grammarRuleTitle,
  taskTopic,
}: {
  language: string;
  languageLevel: string;
  taskPurpose: string;
  grammarRuleTitle?: string;
  taskTopic?: string;
}): string => `
  Generate a test-type task for the ${language} language with the following details:

  - Approximate task's Language Level: ${languageLevel}
  - Purpose: ${taskPurposePrompt(taskPurpose)}
  ${grammarRuleTitle ? `- On Grammar rule: ${grammarRuleTitle}` : ""}
  ${taskTopic ? ` - Topic: ${taskTopic} ` : ""}

  Follow this schema:
  {
    question: "Which answer is second?",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswer: "Answer 2"
  }
`;

// Connection Task Prompt
export const generateConnectionTaskPrompt = ({
  language,
  languageLevel,
  taskPurpose,
  grammarRuleTitle,
  taskTopic,
}: {
  language: string;
  languageLevel: string;
  taskPurpose: string;
  grammarRuleTitle?: string;
  taskTopic?: string;
}): string => `
  Generate a connection-type task for the ${language} language with the following details:

  - Approximate task's Language Level: ${languageLevel}
  - Purpose: ${taskPurposePrompt(taskPurpose)}
  ${grammarRuleTitle ? `- On Grammar rule: ${grammarRuleTitle}` : ""}
  ${taskTopic ? ` - Topic: ${taskTopic} ` : ""}

  Follow this schema:
  {
    "columnA": ["apple", "banana", "orange", "grape"],
    "columnB": ["fruit", "vegetable", "fruit", "fruit"],
    "matches": [
      {"columnAIndex": 0, "columnBIndex": 2},
      {"columnAIndex": 1, "columnBIndex": 0},
      {"columnAIndex": 2, "columnBIndex": 2},
      {"columnAIndex": 3, "columnBIndex": 3}
    ]
  }
`;

// Fill-in-the-Blank Task Prompt
export const generateFillInBlankTaskPrompt = ({
  language,
  languageLevel,
  taskPurpose,
  grammarRuleTitle,
  taskTopic,
}: {
  language: string;
  languageLevel: string;
  taskPurpose: string;
  grammarRuleTitle?: string;
  taskTopic?: string;
}): string => `
  Generate a fill-in-blank-type task for the ${language} language with the following details:

  - Approximate task's Language Level: ${languageLevel}
  - Purpose: ${taskPurposePrompt(taskPurpose)}
  ${grammarRuleTitle ? `- On Grammar rule: ${grammarRuleTitle}` : ""}
  ${taskTopic ? ` - Topic: ${taskTopic} ` : ""}

  Follow this schema:
  {
    "question": "The capital of France is _____ and the largest city in the US is _____",
    "blanks": [
      {"index": 0, "answer": "Paris"},
      {"index": 1, "answer": "New York"}
    ]
  }
`;

const taskPurposePrompt = (purpose: string): string => {
  switch (purpose.toLowerCase()) {
    case "grammar":
      return "Grammar-focused: Evaluate the learner's understanding of grammatical structures and rules.";
    case "vocabulary":
      return "Vocabulary-focused: Test the learner's knowledge of specific words, phrases, and their appropriate usage.";
    case "reading":
      return "Reading Comprehension: Assess the learner’s ability to understand and interpret written text";
    default:
      return "General - this task has a broad focus.";
  }
};
