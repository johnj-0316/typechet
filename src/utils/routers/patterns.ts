import { Router } from "express";
import { body, param, query } from "express-validator";

import { getPatterns } from "../controllers/Pattern/getPatterns";
import { postPatterns } from "../controllers/Pattern/postPatterns";
import { putPatterns } from "../controllers/Pattern/putPatterns";
import { deletePatterns } from "../controllers/Pattern/deletePatterns";
import { patternKeyValidator } from "../tools/patternKeyValidator";
import { rowValidator } from "../tools/rowValidator";

export const patternRouter = Router();

patternRouter.get(["/", "/:id"], [
    param("id").optional().escape().isNumeric().withMessage("id must be a number"),
    query("offset").optional().escape().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().escape().isNumeric().withMessage("limit must be a number")
], getPatterns);

patternRouter.post("/", [
    body("title").escape().isLength({ min: 3, max: 75 }).withMessage("title must be between 3 to 75 characters."),
    body("colors").escape().custom(patternKeyValidator).withMessage("not all keys are present in both colors and sizes"),
    body("rows").escape().custom(rowValidator).withMessage("invalid stitches in pattern"),
    body("materials").escape()
], postPatterns);

//patternRouter.put("/", [], putPatterns);

patternRouter.delete("/:id", [
    param("id").escape().isNumeric().withMessage("numeric id is required")
], deletePatterns);
