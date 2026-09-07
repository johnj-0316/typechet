import { Router } from "express";
import { body, CustomValidator } from "express-validator";

import { getPatterns } from "../controllers/Pattern/getPatterns";
import { postPatterns } from "../controllers/Pattern/postPatterns";
import { putPatterns } from "../controllers/Pattern/putPatterns";
import { patternKeyValidator } from "../tools/patternKeyValidator";
import { rowValidator } from "../tools/rowValidator";

export const patternRouter = Router();

patternRouter.get(["/", "/:id"], getPatterns);

patternRouter.post("/", [
    body("colors").custom(patternKeyValidator).withMessage("Not all keys are present in both colors and sizes"),
    body("rows").custom(rowValidator).withMessage("Invalid stitches in pattern")
], postPatterns);

//patternRouter.put("/", [], putPatterns);
