import { GrammarRuleTranslation } from "@/types";
import { TaskType } from "@prisma/client";

interface GenerateTaskPromptParams {
  language: string;
  languageLevel: string;
  taskType: TaskType;
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
          "example": "Examples in ${language} language, with English comments only when strictly needed to explain context or clarify usage."
      },
      "pl": {
          "title": "Detailed grammar rule name in Polish",
          "description": "Comprehensive and detailed explanation in Polish, suitable for non-native speakers.",
          "example": "Examples in ${language} language with Polish comments only when strictly needed to explain context or clarify usage."
      },
      "uk": {
          "title": "Detailed grammar rule name in Ukrainian",
          "description": "Comprehensive and detailed explanation in Ukrainian, suitable for non-native speakers.",
          "example": "Examples in ${language} language with Ukrainian comments only when strictly needed to explain context or clarify usage."
      }
  }

  Ensure the following:
  - The response must be **valid JSON**.
  - Examples must be in ${language} language.
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
}: GenerateTaskPromptParams) => `
Generate a ${
  taskType.name
} task for the ${language} language. Ensure the task follows these guidelines:

Details for the task:

- Language Level: ${languageLevel}
- Purpose: ${taskType.promptPurpose}
- Topic: ${taskTopic || "General"}
${
  grammarRule &&
  `- Grammar rule: ${grammarRule.title}
- Grammar rule description: ${grammarRule.description}
- Grammar rule examples: ${grammarRule.example}`
}

Follow this schema exactly:

${JSON.stringify(taskType.promptSchema)}

Ensure the following:

1. The whole **task** should be written in **${language}**, **no comments in english.**
2. Strictly adhere to the provided JSON schema without deviations.
3. Do not include any text outside the JSON structure.
4. Structure of the question can be the sentence with blank space, in which you need to put correct answer.
`;

// export const generateGrammarFillInBlankTaskPrompt = ({
//   language,
//   languageLevel,
//   grammarRuleData,
//   taskTopic,
// }: GenerateGrammarTaskParams) => `
// Generate a grammar fill-in-the-blank task for the ${language} language with the following details:

// - Approximate task's Language Level: ${languageLevel}
// - Purpose: To evaluate the user's ability to identify and apply grammar rules in context by completing sentences with the correct forms or structures.
// - Grammar rule: ${grammarRuleData.en.title}
// - Grammar rule description: ${grammarRuleData.en.description}
// - Grammar rule examples: ${grammarRuleData.en.example}
// - Topic: ${taskTopic || "General"}

// Follow this schema:

// {
//   "question": "A sentence with blanks where grammar elements are missing (use underscores to indicate blanks, e.g., 'I ___ to the store yesterday').",
//   "blanks": [
//     {
//       "index": 0,
//       "answer": "Correct answer for the first blank"
//     },
//     {
//       "index": 1,
//       "answer": "Correct answer for the second blank (if applicable)"
//     }
//   ]
// }
// `;

// export const generateReadingTestTaskPrompt = ({
//   language,
//   languageLevel,
//   taskTopic,
// }: GenerateTaskParams) => `
// Generate a reading test task for the ${language} language with the following details:
// - Language Level: ${languageLevel}
// - Purpose: To evaluate the user's ability to comprehend written material, focusing on understanding the main ideas and interpreting the context accurately.
// - Topic: ${taskTopic || "General"}

// Follow this schema:

// {
//   "text": "Provide a 200-300 word article or passage that aligns with the topic.",
//   "question": "Ask a question that requires interpreting the text.",
//   "answers": [
//     "Answer 1",
//     "Answer 2",
//     "Answer 3",
//     "Answer 4"
//   ],
//   "correctAnswer": "The correct answer from the provided options."
// }
// `;

// export const generateReadingConnectionTaskPrompt = ({
//   language,
//   languageLevel,
//   taskTopic,
// }: GenerateTaskParams) => `
// Generate a reading connection task for the ${language} language with the following details:
// - Language Level: ${languageLevel}
// - Purpose: To test the user's ability to match titles with their corresponding texts, demonstrating comprehension and the ability to grasp the main ideas of passages.
// - Topic: ${taskTopic || "General"}

// Follow this schema:

// {
//   "columnA": [
//     "Title 1",
//     "Title 2",
//     "Title 3",
//     "Title 4"
//   ],
//   "columnB": [
//     "Short text 1 (50-100 words)",
//     "Short text 2 (50-100 words)",
//     "Short text 3 (50-100 words)",
//     "Short text 4 (50-100 words)"
//   ],
//   "matches": [
//     {
//       "columnAIndex": 0,
//       "columnBIndex": 2
//     },
//     {
//       "columnAIndex": 1,
//       "columnBIndex": 0
//     },
//     {
//       "columnAIndex": 2,
//       "columnBIndex": 3
//     },
//     {
//       "columnAIndex": 3,
//       "columnBIndex": 1
//     }
//   ]
// }
// `;

// export const generateVocabularyTestTaskPrompt = ({
//   language,
//   languageLevel,
//   taskTopic,
// }: GenerateTaskParams) => `
// Generate a vocabulary test task for the ${language} language with the following details:
// - Approximate task's Language Level: ${languageLevel}
// - Purpose: To assess the user's understanding of vocabulary, specifically their ability to interpret and use words in context.
// - Topic: ${taskTopic || "General"}

// Follow this schema:

// {
//   "text": "Provide a 100-150 word passage or paragraph containing the vocabulary words to be tested.",
//   "question": "Ask a question about the meaning or usage of a word in the text.",
//   "answers": [
//     "Answer 1",
//     "Answer 2",
//     "Answer 3",
//     "Answer 4"
//   ],
//   "correctAnswer": "Answer 2"
// }
// `;

// export const generateVocabularyConnectionTaskPrompt = ({
//   language,
//   languageLevel,
//   taskTopic,
// }: GenerateTaskParams) => `
// Generate a vocabulary connection task for the ${language} language with the following details:
// - Approximate task's Language Level: ${languageLevel}
// - Purpose: To evaluate the user's vocabulary knowledge by testing their ability to match words to their correct meanings or definitions.
// - Topic: ${taskTopic || "General"}

// Follow this schema:

// {
//   "columnA": [
//     "word 1",
//     "word 2",
//     "word 3",
//     "word 4"
//   ],
//   "columnB": [
//     "meaning 1",
//     "meaning 2",
//     "meaning 3",
//     "meaning 4"
//   ],
//   "matches": [
//     {
//       "columnAIndex": 0,
//       "columnBIndex": 2
//     },
//     {
//       "columnAIndex": 1,
//       "columnBIndex": 0
//     },
//     {
//       "columnAIndex": 2,
//       "columnBIndex": 3
//     },
//     {
//       "columnAIndex": 3,
//       "columnBIndex": 1
//     }
//   ]
// }
// `;
