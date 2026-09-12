import { Router } from "express";
import { body, param, query } from "express-validator";

import { getOwners } from "../controllers/Owner/getOwners";
import { postOwners } from "../controllers/Owner/postOwners";
import { putOwners } from "../controllers/Owner/putOwners";
import { deleteOwners } from "../controllers/Owner/deleteOwners";
import { ownerEndpointValidator } from "../tools/ownerEndpointValidator";

export const ownerRouter = Router();

ownerRouter.get(["/", "/:pattern_id"], [
    param("pattern_id").optional().escape().isNumeric().withMessage("pattern id must be a number"),
    query("offset").optional().escape().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().escape().isNumeric().withMessage("limit must be a number")
], getOwners);

ownerRouter.post("/", [
    body("message").optional().escape().trim(),
    body("pattern_id").escape().trim().notEmpty().withMessage("pattern id is required")
    .isNumeric().withMessage("pattern id must be a number"),
    body("user_id").escape().trim().notEmpty().withMessage("user uuid is required")
    .isUUID().withMessage("valid user uuid is required")
], postOwners);

ownerRouter.put("/:user_pattern_id", [
    param("user_pattern_id").escape().notEmpty().custom(ownerEndpointValidator).withMessage("not a valid user or pattern id"),
    body("message").optional().escape().trim(),
    body("pattern_id").escape().trim().notEmpty().withMessage("pattern id is required")
    .isNumeric().withMessage("pattern id must be a number"),
    body("user_id").escape().trim().notEmpty().withMessage("uuid id is required")
    .isUUID().withMessage("valid user uuid is required")
], putOwners);

ownerRouter.delete("/:user_pattern_id", [
    param("user_pattern_id").escape().notEmpty().custom(ownerEndpointValidator).withMessage("not a valid user or pattern id")
],deleteOwners);

