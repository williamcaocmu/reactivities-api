import { Request, Response } from "express";
import db from "../../database/db";

type CreateActivityBody = {
  title: string;
  description?: string;
};

type UpdateActivityBody = {
  title?: string;
  description?: string;
};

export const getActivities = async (req: Request, res: Response) => {
  const activities = await db.activity.findMany();
  res.json(activities);
};

export const getActivityById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const activity = await db.activity.findUnique({
    where: {
      id,
    },
  });

  res.json(activity);
};

export const createActivity = async (
  req: Request<unknown, unknown, CreateActivityBody>,
  res: Response
) => {
  const activity = await db.activity.create({
    data: {
      title: req.body.title,
    },
  });

  res.json(activity);
};

export const updateActivity = () => {};

export const deleteActivity = () => {};
