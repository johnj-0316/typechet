import { Router } from "express";
import { body } from "express-validator";

import { getPatterns } from "../controllers/Pattern/getPatterns";
import { postPattern } from "../controllers/Pattern/postPatterns";

export const patternRouter = Router();

patternRouter.get(["/", "/:id"], getPatterns);

patternRouter.post("/", postPattern);

//patternRouter.put("/")