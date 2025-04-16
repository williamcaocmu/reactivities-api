import { type Request, type Response, type NextFunction } from "express";
import { type AnyZodObject } from "zod";
import { StatusCodes } from "http-status-codes";

export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Validation failed",
        errors: errorMessages,
      });
      return;
    }

    next();
  };
