import type { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as service from "./task.service";

export const create = async (req: AuthRequest, res: Response) => {
  const task = await service.createTask(
    req.body.title,
    req.user!.userId
  );
  res.status(201).json(task);
};

export const getAll = async (req: AuthRequest, res: Response) => {
  const { page = "1", limit = "10", status, search } = req.query;

  const tasks = await service.getTasks(
    req.user!.userId,
    Number(page),
    Number(limit),
    status as string,
    search as string
  );

  res.json(tasks);
};

export const update = async (req: AuthRequest, res: Response) => {
  const task = await service.updateTask(
    req.params.id as string,
    req.body.title,
    req.user!.userId
  );
  res.json(task);
};

export const remove = async (req: AuthRequest, res: Response) => {
  await service.deleteTask(req.params.id as string);
  res.json({ message: "Deleted" });
};

export const toggle = async (req: AuthRequest, res: Response) => {
  const task = await service.toggleTask(req.params.id as string);
  res.json(task);
};