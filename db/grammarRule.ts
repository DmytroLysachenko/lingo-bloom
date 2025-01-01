import { grammarRuleSchema } from "@/schemas";
import { prisma } from "./prisma";

interface ICreateGrammarRule {
  languageId: number;
  data: {
    en: { title: string; description: string; example: string };
    pl: { title: string; description: string; example: string };
    uk: { title: string; description: string; example: string };
  };
  checked?: boolean;
}

interface IUpdateGrammarRule {
  id: number;
  languageId?: number;
  data?: {
    en: { title: string; description: string; example: string };
    pl: { title: string; description: string; example: string };
    uk: { title: string; description: string; example: string };
  };
  checked?: boolean;
}

export const findAllGrammarRules = async () => {
  const rules = await prisma.grammarRule.findMany();
  return rules.map((rule) => grammarRuleSchema.parse(rule));
};

export const findAllLanguageGrammarRules = async (languageId: number) => {
  const rules = await prisma.grammarRule.findMany({
    where: { languageId },
  });
  return rules.map((rule) => grammarRuleSchema.parse(rule));
};

export const findGrammarRuleById = async (id: number) => {
  const rule = await prisma.grammarRule.findUnique({
    where: { id },
  });

  return grammarRuleSchema.parse(rule);
};

export const createGrammarRule = async (data: ICreateGrammarRule) => {
  const { languageId, data: jsonData, checked = false } = data;

  return prisma.grammarRule.create({
    data: {
      language: {
        connect: { id: languageId },
      },
      data: jsonData,
      checked,
    },
  });
};

export const updateGrammarRule = async (
  id: number,
  data: IUpdateGrammarRule
) => {
  return prisma.grammarRule.update({
    where: { id },
    data,
  });
};

export const deleteGrammarRule = async (id: number) => {
  return prisma.grammarRule.delete({
    where: { id },
  });
};
