import { Router } from "express";
import { body, param, query } from "express-validator";

import { getStitches } from "../controllers/Stitch/getStitches";
import { postStitches } from "../controllers/Stitch/postStitches";
import { putStitches } from "../controllers/Stitch/putStitches";
import { deleteStitches } from "../controllers/Stitch/deleteStitches";
import { countryCodeValidator } from "../tools/countryCodeValidator";

export const stitchRouter = Router();

stitchRouter.get(["/", "/:id"], [
    param("id").optional().isNumeric().withMessage("id must be a number"),
    query("offset").optional().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().isNumeric().withMessage("limit must be a number")
], getStitches);

stitchRouter.post("/", [
    body("shorthand").trim().notEmpty().withMessage("shorthand is required"),
    body("name").trim().notEmpty().withMessage("name is required"),
    body("origin").optional().trim()
    .custom(countryCodeValidator).withMessage("Invalid origin country code")
], postStitches);

stitchRouter.put("/:id", [
    param("id").isNumeric().notEmpty().withMessage("numeric id is required"),
    body("shorthand").trim().notEmpty().withMessage("shorthand is required"),
    body("name").trim().notEmpty().withMessage("name is required"),
    body("origin").optional().trim()
    .custom(countryCodeValidator).withMessage("Invalid origin country code")
], putStitches);

stitchRouter.delete("/:id", [
    param("id").isNumeric().notEmpty().withMessage("numeric id is required")
], deleteStitches);