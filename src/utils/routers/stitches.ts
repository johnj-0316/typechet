import { Router } from "express";
import { body } from "express-validator";

import { getStitches } from "../controllers/Stitch/getStitches";
import { postStitches } from "../controllers/Stitch/postStitches";
import { putStitches } from "../controllers/Stitch/putStitches";
import { deleteStitches } from "../controllers/Stitch/deleteStitches";

export const stitchRouter = Router();

stitchRouter.get(["/", "/:id"], [], getStitches);

stitchRouter.post("/", [], postStitches);

stitchRouter.put("/:id", [], putStitches);

stitchRouter.delete("/:id", [], deleteStitches);