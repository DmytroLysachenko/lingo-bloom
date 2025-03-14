import { prisma } from "./prisma";

interface IUser {
  name: string;
  email: string;
  image: string;
}

export const findAllUsers = async () => {
  return prisma.user.findMany();
};

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (id: string, data: IUser) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
