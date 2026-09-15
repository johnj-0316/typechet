import { Router } from "express";
import { body, param, query } from "express-validator";

import { getPatterns } from "../controllers/Pattern/getPatterns";
import { postPatterns } from "../controllers/Pattern/postPatterns";
import { putPatterns } from "../controllers/Pattern/putPatterns";
import { deletePatterns } from "../controllers/Pattern/deletePatterns";
import { rowValidator } from "../tools/rowValidator";

export const patternRouter = Router();

patternRouter.get(["/", "/:id"], [
    param("id").optional().isNumeric().withMessage("id must be a number"),
    query("offset").optional().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().isNumeric().withMessage("limit must be a number")
], getPatterns);

patternRouter.post("/", [
    body("title").optional().trim().isLength({ min: 3, max: 75 }).withMessage("title must be between 3 to 75 characters."),
    //body("rows").trim().custom(rowValidator).withMessage("invalid stitches in pattern"),
    body("is_editing").trim().notEmpty().withMessage("is_editing boolean is required").toBoolean()
], postPatterns);

patternRouter.put("/:id", [
    param("id").notEmpty().withMessage("id is required")
    .isNumeric().withMessage("id must be a number"),
    body("title").optional().trim().isLength({ min: 3, max: 75 }).withMessage("title must be between 3 to 75 characters."),
    //body("rows").trim().custom(rowValidator).withMessage("invalid stitches in pattern"),
    body("is_editing").trim().notEmpty().withMessage("is_editing boolean is required").toBoolean()
], putPatterns);

patternRouter.delete("/:id", [
    param("id").notEmpty().withMessage("id is required")
    .isNumeric().withMessage("id must be a number")
], deletePatterns);
