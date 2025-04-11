import { Request, Response } from "express";
import db from "../../database/db";

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
