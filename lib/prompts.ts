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

// const PURPOSE_EXPLANATION = {
//   grammar:
//     "This task evaluates the user's understanding of grammar rules and their ability to apply them correctly in everyday speech. The focus is on practical usage and rule comprehension.",
//   vocabulary:
//     "This task tests the user's knowledge of vocabulary, emphasizing the understanding and usage of interesting or less common words.",
//   reading:
//     "This task assesses the user's ability to understand and interpret written texts, focusing on grasping the context and main ideas effectively.",
// };
