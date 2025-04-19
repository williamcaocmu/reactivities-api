import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import config from "../config/config";

// Extend the Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Authorization token is required",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Authorization token is required",
      });
      return;
    }

    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };

    // Attach the user ID to the request object for use in route handlers
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid token",
    });
  }
};
