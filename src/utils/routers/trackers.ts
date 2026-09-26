import { Router } from "express";

import { validate } from "../validators/validate";
import { trackersGetValidator, trackersPostValidator, trackersPutValidator, trackersDeleteValidator } from "../validators/route/trackersValidator";

import { getTrackers } from "../services/Tracker/getTrackers";
import { postTrackers } from "../services/Tracker/postTrackers";
import { putTrackers } from "../services/Tracker/putTrackers";
import { deleteTrackers } from "../services/Tracker/deleteTrackers";

export const trackerRouter = Router();
const errorMsg = "Something went wrong with the trackers request.";

trackerRouter.get(["/", "/:id"], trackersGetValidator, validate(errorMsg), getTrackers);

trackerRouter.post("/", trackersPostValidator,validate(errorMsg),postTrackers);

trackerRouter.put("/:id", trackersPutValidator, validate(errorMsg), putTrackers);

trackerRouter.delete("/:id", trackersDeleteValidator, validate(errorMsg),deleteTrackers);
