import { body, param } from "express-validator";
import { paginationValidator } from "../custom/paginationValidator";
import { ownerEndpointValidator } from "../custom/ownerEndpointValidator";

export { ownersGetValidator, ownersPostValidator, ownersPutValidator, ownersDeleteValidator };

const ownersGetValidator = [
    param("pattern_id").optional().isNumeric().withMessage("pattern id must be a number"),
    ...paginationValidator
];

const ownersPostValidator = [
    body("message").optional().trim(),
    body("pattern_id").trim().notEmpty().withMessage("pattern id is required")
    .isNumeric().withMessage("pattern id must be a number"),
    body("user_id").trim().notEmpty().withMessage("user uuid is required")
    .isUUID().withMessage("valid user uuid is required")
];

const ownersPutValidator = [
    param("user_pattern_id").notEmpty().custom(ownerEndpointValidator).withMessage("not a valid user or pattern id"),
    ...ownersPostValidator
];

const ownersDeleteValidator = [
    param("user_pattern_id").notEmpty().custom(ownerEndpointValidator).withMessage("not a valid user or pattern id")
];