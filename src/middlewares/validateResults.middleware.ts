import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export default function validationMiddleware(req: Request, res: Response, next: NextFunction) {
    // Validate and handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
}
