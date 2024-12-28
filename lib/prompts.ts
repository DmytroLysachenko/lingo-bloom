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
        example: "Example in ${language} with Ukrainian comments if needed"
      }
  }

  Ensure that example is in ${language} language!

  Ensure the rule does not repeat any from the following list: ${JSON.stringify(
    existingTitles
  )}.

  This rule should be extensive enough for non-native speakers to understand how to use it in daily communication.
  `;

// const READING_PROMPT_SCHEMAS = {
//   test: `{
//       text: "Provide a 200-300 word article or text.",
//       question: "Ask a question about the text.",
//       answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
//       correctAnswer: "Answer 2"
//     }`,
//   connection: `{
//     "columnA": ["title 1", "title 2", "title 3", "title 4"],
//     "columnB": ["small text 3", "small text 1", " small text 3", " small text 4"],
//     "matches": [
//       {"columnAIndex": 0, "columnBIndex": 2},
//       {"columnAIndex": 1, "columnBIndex": 0},
//       {"columnAIndex": 2, "columnBIndex": 2},
//       {"columnAIndex": 3, "columnBIndex": 3}
//     ]
//   }`,
// };

// const VOCABULARY_PROMPT_SCHEMAS = {
//   test: `{
//     question: "Dora is teaching kids, because she is ____ ",
//     answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
//     correctAnswer: "Answer 2"
//   }`,
//   connection: `{
//     "columnA": ["word 1", "word 2", "word 3", "word 4"],
//     "columnB": ["meaning 1", "meaning 2", "meaning 3", "meaning 4"],
//     "matches": [
//       {"columnAIndex": 0, "columnBIndex": 2},
//       {"columnAIndex": 1, "columnBIndex": 0},
//       {"columnAIndex": 2, "columnBIndex": 2},
//       {"columnAIndex": 3, "columnBIndex": 3}
//     ]
//   }`,
// };

// const GRAMMAR_PROMPT_SCHEMAS = {
//   test: `{
//     question: "Which answer is second?",
//     answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
//     correctAnswer: "Answer 2"
//   }`,
//   connection: `{
//     "columnA": ["apple", "banana", "orange", "grape"],
//     "columnB": ["fruit", "vegetable", "fruit", "fruit"],
//     "matches": [
//       {"columnAIndex": 0, "columnBIndex": 2},
//       {"columnAIndex": 1, "columnBIndex": 0},
//       {"columnAIndex": 2, "columnBIndex": 2},
//       {"columnAIndex": 3, "columnBIndex": 3}
//     ]
//   }`,
//   fillInBlank: `{
//     "question": "The capital of France is _____ and the largest city in the US is _____",
//     "blanks": [
//       {"index": 0, "answer": "Paris"},
//       {"index": 1, "answer": "New York"}
//     ]
//   }`,
// };

// const PURPOSE_EXPLANATION = {
//   grammar:
//     "This task evaluates the user's understanding of grammar rules and their ability to apply them correctly in everyday speech. The focus is on practical usage and rule comprehension.",
//   vocabulary:
//     "This task tests the user's knowledge of vocabulary, emphasizing the understanding and usage of interesting or less common words.",
//   reading:
//     "This task assesses the user's ability to understand and interpret written texts, focusing on grasping the context and main ideas effectively.",
// };
