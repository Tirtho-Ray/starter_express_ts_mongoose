import { NextFunction, Request, Response } from "express";
import { ZodError, ZodTypeAny } from "zod";
import { catchAsync } from "../utils/catchAsync";

const validateRequest = (schema: ZodTypeAny) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody;
      next();
    } catch (error) {

      if (error instanceof ZodError) {
        const zodError = error as ZodError<any>; 

        const formattedErrors = zodError.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: formattedErrors,
        });
      }
      next(error);
    }
  });
};

export default validateRequest;
