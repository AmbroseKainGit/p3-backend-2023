import { Prisma } from "@prisma/client";
import { ErrorRequestHandler, RequestHandler, Request, Response, NextFunction } from "express";
export const defaultErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({
    type: err.constructor.name,
    message: err.toString(),
  });
}

export const errorChecked = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          res.status(500).json({
            error: `There is a unique constraint violation in the fields: ${e.meta?.target}`,
          });
        }
      }
      next(e);
    }
  }
}