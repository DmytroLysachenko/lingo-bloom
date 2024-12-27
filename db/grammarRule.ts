import { prisma } from "./prisma";

interface ICreateGrammarRule {
  languageId: number;
  data: string;
  checked?: boolean;
}

interface IUpdateGrammarRule {
  id: number;
  languageId?: number;
  data?: string;
  checked?: boolean;
}

export const findAllGrammarRules = async () => {
  return prisma.grammarRule.findMany();
};

export const findAllLanguageGrammarRules = async (languageId: number) => {
  return prisma.grammarRule.findMany({
    where: { languageId },
  });
};

export const findGrammarRuleById = async (id: number) => {
  return prisma.grammarRule.findUnique({
    where: { id },
  });
};

export const createGrammarRule = async (data: ICreateGrammarRule) => {
  return prisma.grammarRule.create({
    data,
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
