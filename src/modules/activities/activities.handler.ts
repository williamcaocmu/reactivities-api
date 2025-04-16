import { Request, Response } from "express";
import db from "../../database/db";

type CreateActivityBody = {
  title: string;
  description?: string;
  category?: string;
  city?: string;
  venue?: string;
  date?: string;
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
  const { title, description, category, city, venue, date } = req.body;
  const activity = await db.activity.create({
    data: {
      title,
      description,
      category,
      city,
      venue,
      date: date ? new Date(date) : undefined,
    },
  });

  res.status(201).json(activity);
};

export const updateActivity = () => {};

export const deleteActivity = () => {};
