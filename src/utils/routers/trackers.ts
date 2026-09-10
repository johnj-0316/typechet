import { Router } from "express";
import { body, param, query } from "express-validator";

import { getTrackers } from "../controllers/Tracker/getTrackers";
import { postTrackers } from "../controllers/Tracker/postTrackers";
import { putTrackers } from "../controllers/Tracker/putTrackers";
import { deleteTrackers } from "../controllers/Tracker/deleteTrackers";

export const trackerRouter = Router();

trackerRouter.get(["/", "/:id"], [
    param("id").optional().escape().isUUID().notEmpty().withMessage("uuid must be valid"),
    query("offset").optional().escape().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().escape().isNumeric().withMessage("limit must be a number")
], getTrackers);

trackerRouter.post("/", [], postTrackers);

trackerRouter.put("/:id", [
    param("id").escape().isUUID().notEmpty().withMessage("valid uuid is required")
], putTrackers);

trackerRouter.delete("/:id", [
    param("id").escape().isUUID().notEmpty().withMessage("valid uuid is required")
], deleteTrackers);
