import { Router } from "express";

import { validate } from "../validators/validate";
import { stitchesGetValidator, stitchesPostValidator, stitchesPutValidator, stitchesDeleteValidator } from "../validators/route/stitchesValidator";

import { getStitches } from "../services/Stitch/getStitches";
import { postStitches } from "../services/Stitch/postStitches";
import { putStitches } from "../services/Stitch/putStitches";
import { deleteStitches } from "../services/Stitch/deleteStitches";

export const stitchRouter = Router();
const errorMsg = "Something went wrong with the stitches request.";

stitchRouter.get(["/", "/:id"], stitchesGetValidator, validate(errorMsg), getStitches);

stitchRouter.post("/", stitchesPostValidator, validate(errorMsg), postStitches);

stitchRouter.put("/:id", stitchesPutValidator, validate(errorMsg), putStitches);

stitchRouter.delete("/:id", stitchesDeleteValidator, validate(errorMsg), deleteStitches);