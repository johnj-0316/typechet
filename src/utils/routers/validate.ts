import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ClientError } from "../errors/Error";

export function validate(message = "Invalid request.") {
    return (req: Request, _res: Response, next: NextFunction) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            throw new ClientError(message, 400, result.array());
        }

        next();
    };
}