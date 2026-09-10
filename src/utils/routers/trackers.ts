import { Router } from "express";
import { body, param, query } from "express-validator";

import { getTrackers } from "../controllers/Tracker/getTrackers";
import { postTrackers } from "../controllers/Tracker/postTrackers";
import { putTrackers } from "../controllers/Tracker/putTrackers";
import { deleteTrackers } from "../controllers/Tracker/deleteTrackers";

export const trackerRouter = Router();

trackerRouter.get(["/", "/:id"], [], getTrackers);

trackerRouter.post("/", [], postTrackers);

trackerRouter.put("/:id", [], putTrackers);

trackerRouter.delete("/:id", [], deleteTrackers);
