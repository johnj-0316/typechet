import { Router } from "express";
import { body, query, CustomValidator, param } from "express-validator";

import { getPatterns } from "../controllers/Pattern/getPatterns";
import { postPatterns } from "../controllers/Pattern/postPatterns";
import { putPatterns } from "../controllers/Pattern/putPatterns";
import { deletePatterns } from "../controllers/Pattern/deletePatterns";
import { patternKeyValidator } from "../tools/patternKeyValidator";
import { rowValidator } from "../tools/rowValidator";

export const patternRouter = Router();

patternRouter.get(["/", "/:id"], [
    query("id").escape()
], getPatterns);

patternRouter.post("/", [
    body("colors").escape().custom(patternKeyValidator).withMessage("Not all keys are present in both colors and sizes"),
    body("rows").escape().custom(rowValidator).withMessage("Invalid stitches in pattern"),
    body("materials").escape(),
    body("title").escape()
], postPatterns);

//patternRouter.put("/", [], putPatterns);

patternRouter.delete("/:id", [
    param("id").escape().isNumeric().withMessage("id must be a whole number")
], deletePatterns);
