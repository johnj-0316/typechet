import { Router } from "express";
import { body, param, query } from "express-validator";

import { getOwners } from "../controllers/Owner/getOwners";
import { postOwners } from "../controllers/Owner/postOwners";
import { putOwners } from "../controllers/Owner/putOwners";
import { deleteOwners } from "../controllers/Owner/deleteOwners";
import { compositeEndpointValidator } from "../tools/compositeEndpointValidator";

export const ownerRouter = Router();

ownerRouter.get(["/", "/:pattern_id"], [
    param("pattern_id").optional().escape().isNumeric().withMessage("pattern id must be a number"),
    query("offset").optional().escape().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().escape().isNumeric().withMessage("limit must be a number")
], getOwners);

ownerRouter.post("/", [
    body("message").optional().escape(),
    body("pattern_id").escape().notEmpty().withMessage("pattern id is required")
    .isNumeric().withMessage("pattern id must be a number"),
    body("user_id").escape().notEmpty().withMessage("user id is required"),
], postOwners);

ownerRouter.put("/:user_pattern_id", [
    param("user_pattern_id").escape().notEmpty().custom(compositeEndpointValidator).withMessage("not a valid route parameter"),
    body("message").optional().escape(),
    body("pattern_id").escape().notEmpty().withMessage("pattern id is required")
    .isNumeric().withMessage("pattern id must be a number"),
    body("user_id").escape().notEmpty().withMessage("user id is required"),
], putOwners);

ownerRouter.delete("/:user_pattern_id", [
    param("user_pattern_id").escape().notEmpty().custom(compositeEndpointValidator).withMessage("not a valid route parameter")
],deleteOwners);

