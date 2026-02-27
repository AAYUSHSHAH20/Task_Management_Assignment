import { prisma } from "../../config/prisma";

export const createTask = async (
  title: string,
  userId: string
) => {
  return prisma.task.create({
    data: { title, userId },
  });
};

export const getTasks = async (
  userId: string,
  page: number,
  limit: number,
  status?: string,
  search?: string
) => {
  return prisma.task.findMany({
    where: {
      userId,
      status: status ? status === "true" : undefined,
      title: search
        ? { contains: search, mode: "insensitive" }
        : undefined,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
};

export const updateTask = async (
  id: string,
  title: string,
  userId: string
) => {
  return prisma.task.update({
    where: { id },
    data: { title },
  });
};

export const deleteTask = async (id: string) => {
  return prisma.task.delete({
    where: { id },
  });
};

export const toggleTask = async (id: string) => {
  const task = await prisma.task.findUnique({ where: { id } });
  return prisma.task.update({
    where: { id },
    data: { status: !task?.status },
  });
};