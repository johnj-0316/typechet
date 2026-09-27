import { Router } from "express";

import { validate } from "../validators/validate";
import { stitchesGetValidator, stitchesPostValidator, stitchesPutValidator, stitchesDeleteValidator } from "../validators/route/stitchesValidator";

import { getStitches } from "../controllers/Stitch/getStitches";
import { postStitches } from "../controllers/Stitch/postStitches";
import { putStitches } from "../controllers/Stitch/putStitches";
import { deleteStitches } from "../controllers/Stitch/deleteStitches";

export const stitchRouter = Router();
const errorMsg = "Something went wrong with the stitches request.";

stitchRouter.get(["/", "/:id"], stitchesGetValidator, validate(errorMsg), getStitches);

stitchRouter.post("/", stitchesPostValidator, validate(errorMsg), postStitches);

stitchRouter.put("/:id", stitchesPutValidator, validate(errorMsg), putStitches);

stitchRouter.delete("/:id", stitchesDeleteValidator, validate(errorMsg), deleteStitches);