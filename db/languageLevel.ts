import { prisma } from "./prisma";

interface ILanguageLevel {
  name: string;
  description?: string;
}

export const findAllLanguageLevels = async () => {
  return prisma.languageLevel.findMany();
};

export const findLanguageLevelById = async (id: number) => {
  return prisma.languageLevel.findUnique({
    where: { id },
  });
};

export const createLanguageLevel = async (data: ILanguageLevel) => {
  return prisma.languageLevel.create({
    data,
  });
};

export const updateLanguageLevel = async (id: number, data: ILanguageLevel) => {
  return prisma.languageLevel.update({
    where: { id },
    data,
  });
};

export const deleteLanguageLevel = async (id: number) => {
  return prisma.languageLevel.delete({
    where: { id },
  });
};
