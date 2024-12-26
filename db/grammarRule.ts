import { prisma } from "./prisma";

interface IGrammarRule {
  languageId: number;
  data: string;
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

export const createGrammarRule = async (data: IGrammarRule) => {
  return prisma.grammarRule.create({
    data,
  });
};

export const updateGrammarRule = async (id: number, data: IGrammarRule) => {
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
