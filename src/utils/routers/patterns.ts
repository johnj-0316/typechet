import { Router } from "express";
import { body, param, query } from "express-validator";

import { getPatterns } from "../controllers/Pattern/getPatterns";
import { postPatterns } from "../controllers/Pattern/postPatterns";
import { putPatterns } from "../controllers/Pattern/putPatterns";
import { deletePatterns } from "../controllers/Pattern/deletePatterns";
import { rowValidator } from "../tools/rowValidator";

export const patternRouter = Router();

patternRouter.get(["/", "/:id"], [
    param("id").optional().escape().isNumeric().withMessage("id must be a number"),
    query("offset").optional().escape().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().escape().isNumeric().withMessage("limit must be a number")
], getPatterns);

patternRouter.post("/", [
    body("title").optional().escape().trim().isLength({ min: 3, max: 75 }).withMessage("title must be between 3 to 75 characters."),
    //body("rows").escape().trim().custom(rowValidator).withMessage("invalid stitches in pattern"),
    body("is_editing").escape().trim().isBoolean().withMessage("is_editing must be a valid boolean")
], postPatterns);

patternRouter.put("/", [
    param("id").escape().notEmpty().withMessage("id is required")
    .isNumeric().withMessage("id must be a number"),
    body("title").optional().escape().trim().isLength({ min: 3, max: 75 }).withMessage("title must be between 3 to 75 characters."),
    //body("rows").escape().trim().custom(rowValidator).withMessage("invalid stitches in pattern"),
    body("is_editing").escape().trim().isBoolean().withMessage("is_editing must be a valid boolean")
], putPatterns);

patternRouter.delete("/:id", [
    param("id").escape().notEmpty().withMessage("id is required")
    .isNumeric().withMessage("id must be a number")
], deletePatterns);
