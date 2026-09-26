import { body, param } from "express-validator";
import { paginationValidator } from "../custom/paginationValidator";
//import { rowValidator };

export { patternsGetValidator, patternsPostValidator, patternsPutValidator, patternsDeleteValidator };

const patternsGetValidator = [
    param("id").optional().isNumeric().withMessage("id must be a number"),
    ...paginationValidator
];

const patternsPostValidator = [
    body("title").optional().trim().isLength({ min: 3, max: 75 }).withMessage("title must be between 3 to 75 characters."),
    //body("rows").trim().custom(rowValidator).withMessage("invalid stitches in pattern"),
    body("is_editing").trim().notEmpty().withMessage("is_editing boolean is required").toBoolean()
];

const patternsPutValidator = [
    param("id").notEmpty().withMessage("id is required")
    .isNumeric().withMessage("id must be a number"),
    ...patternsPostValidator
];

const patternsDeleteValidator = [
    param("id").notEmpty().withMessage("id is required")
    .isNumeric().withMessage("id must be a number")
];