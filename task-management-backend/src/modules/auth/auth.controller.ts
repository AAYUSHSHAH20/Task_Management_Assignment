import type { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
} from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await registerUser(email, password);
    res.status(201).json({ message: "User registered" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const tokens = await loginUser(
      req.body.email,
      req.body.password
    );
    res.json(tokens);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const tokens = await refreshAccessToken(
      req.body.refreshToken
    );
    res.json(tokens);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.json({ message: "Logged out" });
};