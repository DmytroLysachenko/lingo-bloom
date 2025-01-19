import { prisma } from "./prisma";

interface ILanguage {
  name: string;
  code: string;
}

export const findAllLanguages = async () => {
  return prisma.language.findMany();
};

export const findLanguageById = async (id: number) => {
  return prisma.language.findUnique({
    where: { id },
  });
};

export const createLanguage = async (data: ILanguage) => {
  return prisma.language.create({
    data,
  });
};

export const updateLanguage = async (id: number, data: ILanguage) => {
  return prisma.language.update({
    where: { id },
    data,
  });
};

export const deleteLanguage = async (id: number) => {
  return prisma.language.delete({
    where: { id },
  });
};
