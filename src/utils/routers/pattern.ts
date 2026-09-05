import { Router } from "express";
import { body } from "express-validator";

import { postPattern } from "../controllers/Pattern/postPatterns";

export const patternRouter = Router();

//patternRouter.get("/")

patternRouter.post("/", postPattern);

//patternRouter.put("/")