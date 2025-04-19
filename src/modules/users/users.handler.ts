import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import db from "../../database/db";
import { SignInBody, type SignUpBody } from "./users.validation";

export const signUp = async (
  req: Request<unknown, unknown, SignUpBody>,
  res: Response
) => {
  const { email, password, displayName, imageUrl } = req.body;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "User already exists",
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      displayName: displayName,
      imageUrl,
    },
    select: {
      id: true,
      email: true,
      displayName: true,
      imageUrl: true,
    },
  });

  res.status(StatusCodes.CREATED).json(user);
};

export const signIn = async (
  req: Request<unknown, unknown, SignInBody>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid credentials",
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid credentials",
    });
    return;
  }

  const token = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: config.expiresIn,
  });

  res.status(StatusCodes.OK).json({ token });
};

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "User not authenticated",
      });
      return;
    }

    const user = await db.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        displayName: true,
        imageUrl: true,
      },
    });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving user profile",
    });
  }
};
