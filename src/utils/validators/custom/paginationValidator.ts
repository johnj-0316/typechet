import { query, ValidationChain } from "express-validator";

const paginationValidator: ValidationChain[] = [
    query("offset").optional().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().isNumeric().withMessage("limit must be a number")
];

export { paginationValidator };