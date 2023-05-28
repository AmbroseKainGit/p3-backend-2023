import { Prisma } from "@prisma/client";
import { ErrorRequestHandler, RequestHandler, Request, Response, NextFunction } from "express";

enum ErrorCode {
  UniqueConstraintViolation = 'P2002',
  RecordNotFound = 'P2025'
}

const errorMessages: Record<ErrorCode, string> = {
  [ErrorCode.UniqueConstraintViolation]: 'There is a unique constraint violation in the fields: %s',
  [ErrorCode.RecordNotFound]: 'An operation failed because it depends on one or more records that were required but not found. %s',
};

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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === ErrorCode.UniqueConstraintViolation) {
          const formattedMessage = errorMessages[error.code].replace('%s', (error.meta?.target || '') as string);
          res.status(500).json({
            error: formattedMessage,
          });

        }
        if (error.code === ErrorCode.RecordNotFound) {
          const formattedMessage = errorMessages[error.code].replace('%s', (error.meta?.cause || '') as string);
          res.status(500).json({
            error: formattedMessage,
          });
        }
      }
      next(error);
    }
  }
}