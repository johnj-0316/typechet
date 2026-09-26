import { body, param } from "express-validator";
import { paginationValidator } from "../custom/paginationValidator";
//import { currentStitchValidator } from "../custom/currentStitchValidator";

export { trackersGetValidator, trackersPostValidator, trackersPutValidator, trackersDeleteValidator };

const trackersGetValidator = [
    param("id").optional().isUUID().withMessage("uuid must be valid"),
    ...paginationValidator
];

const trackersPostValidator = [
    body("pattern_id").trim().notEmpty().withMessage("pattern id is required")
    .isNumeric().withMessage("pattern id must be a number"),
    body("title").optional().trim().isLength({ min: 3, max: 75 }).withMessage("title must be between 3 to 75 characters."),
    body("current_row").notEmpty().withMessage("current_row is required")
    .isNumeric().withMessage("current_row must be a number"),
    //body("current_stitch").optional().custom(currentStitchValidator).withMessage("current_stitch must be a valid in the pattern"),
    body("current_index").notEmpty().withMessage("current_index is required")
    .isNumeric().withMessage("current_index must be a number"),
    body("is_finished").trim().notEmpty().withMessage("is_finished boolean is required").toBoolean()
];

const trackersPutValidator = [
    param("id").notEmpty().withMessage("uuid is required")
    .isUUID().withMessage("valid uuid is required"),
    ...trackersPostValidator
];

const trackersDeleteValidator = [
    param("id").notEmpty().withMessage("uuid is required")
    .isUUID().withMessage("valid uuid is required")
];