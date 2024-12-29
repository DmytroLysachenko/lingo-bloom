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
  const { languageId, data: jsonData, checked } = data;

  return prisma.grammarRule.update({
    where: { id },
    data: {
      language: {
        connect: { id: languageId },
      },
      data: jsonData,
      checked,
    },
  });
};

export const deleteGrammarRule = async (id: number) => {
  return prisma.grammarRule.delete({
    where: { id },
  });
};
