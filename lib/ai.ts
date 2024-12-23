import { findAllGrammarRules } from "@/db/grammarRule";
import OpenAI from "openai";

const openai = new OpenAI();

const generatePolishGrammarRulePrompt = (existingTitles: string[]) => `
  Generate a grammar rule JSON object for the Polish language. Follow this schema:
  {
    data: {
      en: {
        title: "Title in English",
        description: "Comprehensive and Detailed explanation in English",
        example: "Comprehensive Examples in English"
      },
      pl: {
        title: "Title in Polish",
        description: "Comprehensive and Detailed explanation in Polish",
        example: "Comprehensive Examples in Polish"
      },
      uk: {
        title: "Title in Ukrainian",
        description: "Comprehensive and Detailed explanation in Ukrainian",
        example: "Comprehensive Examples in Ukrainian"
      }
    }
  }
  Ensure the title is unique and does not repeat from the following list: ${JSON.stringify(
    existingTitles
  )}.
  Generate only the JSON object.
  `;

const getCurrentlyExistingRules = async () => {
  const existingRules = await findAllGrammarRules(0);

  return existingRules.map((rule) => {
    const data = JSON.parse(rule.data as string);
    return data.en.title;
  });
};

export const generatePolishGrammarRule = async () => {
  const existingRules = await getCurrentlyExistingRules();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content:
          "You are AI for generation data, so all replies should be in json format only. ",
      },
      {
        role: "user",
        content: generatePolishGrammarRulePrompt(existingRules),
      },
    ],
  });

  return response;
};
