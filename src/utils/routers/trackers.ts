import { Router } from "express";
import { body, param, query } from "express-validator";

import { getTrackers } from "../controllers/Tracker/getTrackers";
import { postTrackers } from "../controllers/Tracker/postTrackers";
import { putTrackers } from "../controllers/Tracker/putTrackers";
import { deleteTrackers } from "../controllers/Tracker/deleteTrackers";
import { currentStitchValidator } from "../tools/currentStitchValidator";

export const trackerRouter = Router();

trackerRouter.get(["/", "/:id"], [
    param("id").optional().isUUID().withMessage("uuid must be valid"),
    query("offset").optional().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().isNumeric().withMessage("limit must be a number")
], getTrackers);

trackerRouter.post("/", [
    body("pattern_id").trim().notEmpty().withMessage("pattern id is required")
    .isNumeric().withMessage("pattern id must be a number"),
    body("title").optional().trim().isLength({ min: 3, max: 75 }).withMessage("title must be between 3 to 75 characters."),
    body("current_row").notEmpty().withMessage("current_row is required")
    .isNumeric().withMessage("current_row must be a number"),
    //body("current_stitch").optional().custom(currentStitchValidator).withMessage("current_stitch must be a valid in the pattern"),
    body("current_index").notEmpty().withMessage("current_index is required")
    .isNumeric().withMessage("current_index must be a number"),
    body("is_finished").trim().isBoolean().withMessage("is_finished must be a valid boolean")
], postTrackers);

trackerRouter.put("/:id", [
    param("id").notEmpty().withMessage("uuid is required")
    .isUUID().withMessage("valid uuid is required"),
    body("title").optional().trim().isLength({ min: 3, max: 75 }).withMessage("title must be between 3 to 75 characters."),
    body("current_row").notEmpty().withMessage("current_row is required")
    .isNumeric().withMessage("current_row must be a number"),
    //body("current_stitch").optional().custom(currentStitchValidator).withMessage("current_stitch must be a valid in the pattern"),
    body("current_index").notEmpty().withMessage("current_index is required")
    .isNumeric().withMessage("current_index must be a number"),
    body("is_finished").trim().isBoolean().withMessage("is_finished must be a valid boolean")
], putTrackers);

trackerRouter.delete("/:id", [
    param("id").notEmpty().withMessage("uuid is required")
    .isUUID().withMessage("valid uuid is required")
], deleteTrackers);
