import { Router } from "express";
import { body, param, query } from "express-validator";

import { getStitches } from "../controllers/Stitch/getStitches";
import { postStitches } from "../controllers/Stitch/postStitches";
import { putStitches } from "../controllers/Stitch/putStitches";
import { deleteStitches } from "../controllers/Stitch/deleteStitches";
import { countryCodeValidator } from "../tools/countryCodeValidator";

export const stitchRouter = Router();

stitchRouter.get(["/", "/:id"], [
    param("id").optional().escape().isNumeric().withMessage("id must be a number"),
    query("offset").optional().escape().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().escape().isNumeric().withMessage("limit must be a number")
], getStitches);

stitchRouter.post("/", [
    body("shorthand").escape().trim().notEmpty().withMessage("shorthand is required"),
    body("name").escape().trim().notEmpty().withMessage("name is required"),
    body("origin").escape().trim().notEmpty().withMessage("origin is required")
    .custom(countryCodeValidator).withMessage("Invalid origin country code")
], postStitches);

stitchRouter.put("/:id", [
    param("id").escape().isNumeric().withMessage("numeric id is required"),
    body("shorthand").escape().trim().notEmpty().withMessage("shorthand is required"),
    body("name").escape().trim().notEmpty().withMessage("name is required"),
    body("origin").escape().trim().notEmpty().withMessage("origin is required")
    .custom(countryCodeValidator).withMessage("Invalid origin country code")
], putStitches);

stitchRouter.delete("/:id", [
    param("id").escape().isNumeric().withMessage("numeric id is required")
], deleteStitches);