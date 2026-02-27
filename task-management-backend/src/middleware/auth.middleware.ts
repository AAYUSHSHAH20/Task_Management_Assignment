import type { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { userId: string };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET!
    ) as { userId: string };

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid Token" });
  }
};  