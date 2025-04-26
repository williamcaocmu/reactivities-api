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

export const getActivities = async (req: Request, res: Response) => {
  const activities = await db.activity.findMany({
    include: {
      attendees: {
        select: {
          user: {
            select: {
              id: true,
              displayName: true,
              imageUrl: true,
            },
          },
        },
      },
      host: {
        select: {
          id: true,
          displayName: true,
          imageUrl: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  const activitiesWithHost = activities.map((act) => ({
    ...act,
    attendees: act.attendees.map((attendee) => ({
      displayName: attendee.user.displayName,
      imageUrl: attendee.user.imageUrl,
      id: attendee.user.id,
    })),
  }));

  res.json(activitiesWithHost);
};

export const getActivityById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const activity = await db.activity.findUnique({
    where: {
      id,
    },
    include: {
      host: {
        select: {
          id: true,
          displayName: true,
          imageUrl: true,
        },
      },
      attendees: {
        select: {
          isHost: true,
          user: {
            select: {
              id: true,
              displayName: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  const activityWithAttendees = {
    ...activity,
    attendees: activity?.attendees.map((attendee) => ({
      displayName: attendee.user.displayName,
      imageUrl: attendee.user.imageUrl,
      id: attendee.user.id,
      isHost: attendee.isHost,
    })),
  };
  res.json(activityWithAttendees);
};

export const createActivity = async (
  req: Request<unknown, unknown, CreateActivityBody>,
  res: Response
) => {
  const { title, description, category, city, venue, date } = req.body;

  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const activity = await db.activity.create({
    data: {
      title,
      description,
      category,
      city,
      venue,
      date: date ? new Date(date) : undefined,
      attendees: {
        create: {
          userId,
          isHost: true,
        },
      },
      host: {
        connect: {
          id: userId,
        },
      },
    },
  });

  res.status(201).json(activity);
};

export const updateActivity = () => {};

export const deleteActivity = () => {};

export const attendActivity = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const activity = await db.activity.findUnique({
    where: { id },
    include: {
      attendees: true,
    },
  });

  if (!activity) {
    res.status(404).json({ message: "Activity not found" });
    return;
  }

  const isHost = activity.attendees.some(
    (attendee) => attendee.userId === userId && activity.hostId === userId
  );

  if (isHost) {
    await db.activity.update({
      where: { id },
      data: { isCanceled: !activity.isCanceled },
    });
    res.status(200).json({ message: "Activity updated" });
    return;
  }

  if (activity.isCanceled) {
    res.status(400).json({ message: "Activity is cancelled" });
    return;
  }

  const attendance = activity.attendees.find((att) => att.userId === userId);

  if (attendance) {
    // delete attendance

    await db.activityAttendee.delete({
      where: {
        userId_activityId: {
          userId: userId,
          activityId: id,
        },
      },
    });
  } else {
    // create attendance

    await db.activityAttendee.create({
      data: {
        userId: userId,
        activityId: id,
      },
    });
  }

  res.status(200).json({ message: "Attendance updated" });
};
