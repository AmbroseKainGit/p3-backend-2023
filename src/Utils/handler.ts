import { ErrorRequestHandler, RequestHandler, Request, Response, NextFunction } from "express";
export const defaultErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({
    type: err.constructor.name,
    message: err.toString(),
  });
}

export const errorChecked = (handler: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      handler(req, res, next);
    } catch (e) {
      next(e);
    }
  }
}