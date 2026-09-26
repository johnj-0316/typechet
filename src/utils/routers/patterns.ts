import { Router } from "express";

import { validate } from "../validators/validate";
import { patternsGetValidator, patternsPostValidator, patternsPutValidator, patternsDeleteValidator } from "../validators/route/patternsValidator";

import { getPatterns } from "../services/Pattern/getPatterns";
import { postPatterns } from "../services/Pattern/postPatterns";
import { putPatterns } from "../services/Pattern/putPatterns";
import { deletePatterns } from "../services/Pattern/deletePatterns";

export const patternRouter = Router();
const errorMsg = "Something went wrong with the patterns request.";

patternRouter.get(["/", "/:id"], patternsGetValidator, validate(errorMsg), getPatterns);

patternRouter.post("/", patternsPostValidator, validate(errorMsg), postPatterns);

patternRouter.put("/:id", patternsPutValidator, validate(errorMsg), putPatterns);

patternRouter.delete("/:id", patternsDeleteValidator, validate(errorMsg), deletePatterns);
