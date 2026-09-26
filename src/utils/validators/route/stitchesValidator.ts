import { body, param } from "express-validator";
import { paginationValidator } from "../custom/paginationValidator";
import { countryCodeValidator } from "../custom/countryCodeValidator";

export { stitchesGetValidator, stitchesPostValidator, stitchesPutValidator, stitchesDeleteValidator };

const stitchesGetValidator = [
    param("id").optional().isNumeric().withMessage("id must be a number"),
    ...paginationValidator
];

const stitchesPostValidator = [
    body("shorthand").trim().notEmpty().withMessage("shorthand is required"),
    body("name").trim().notEmpty().withMessage("name is required"),
    body("origin").optional().trim()
    .custom(countryCodeValidator).withMessage("Invalid origin country code")
];

const stitchesPutValidator = [
    param("id").isNumeric().notEmpty().withMessage("numeric id is required"),
    ...stitchesPostValidator
];

const stitchesDeleteValidator = [
    param("id").notEmpty().withMessage("id is required")
    .isNumeric().withMessage("id must be a number")
];