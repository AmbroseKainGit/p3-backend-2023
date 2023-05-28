import { NextFunction, Request, response } from "express";
import { validationResult } from "express-validator";

export const validateFields = (req: Request, res = response, next: NextFunction) => {
    // Error Handling 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
}
