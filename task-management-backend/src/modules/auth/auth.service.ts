import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { generateTokens } from "../../utils/generateTokens";

export const registerUser = async (email: string, password: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const tokens = generateTokens(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  return tokens;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET!
  ) as { userId: string };

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user || user.refreshToken !== refreshToken)
    throw new Error("Invalid refresh token");

  const tokens = generateTokens(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  return tokens;
};