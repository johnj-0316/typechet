import { Router } from "express";
import { body } from "express-validator";

import { getPatterns } from "../controllers/Pattern/getPatterns";
import { postPattern } from "../controllers/Pattern/postPatterns";
import { putPatterns } from "../controllers/Pattern/putPatterns";

export const patternRouter = Router();

patternRouter.get(["/", "/:id"], getPatterns);

patternRouter.post("/", postPattern);

//patternRouter.put("/", putPatterns);