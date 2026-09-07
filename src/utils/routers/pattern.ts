import { Router } from "express";
import { body, query, CustomValidator } from "express-validator";

import { getPatterns } from "../controllers/Pattern/getPatterns";
import { postPatterns } from "../controllers/Pattern/postPatterns";
import { putPatterns } from "../controllers/Pattern/putPatterns";
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
