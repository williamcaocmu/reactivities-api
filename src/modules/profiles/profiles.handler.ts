import { Request, Response } from "express";
import db from "../../database/db";
import { uploadPhoto } from "../upload.handler";

export const getProfileById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      displayName: true,
      imageUrl: true,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json(user);
};

export const uploadPhotoHandler = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  const userId = req.user?.id as string;

  const { url, id } = await uploadPhoto(file);
  const photo = await db.photo.create({
    data: {
      url,
      publicId: id,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  res.json(photo);
};
