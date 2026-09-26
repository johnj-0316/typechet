import { body, param } from "express-validator";
import { paginationValidator } from "../custom/paginationValidator";
import { categoryValidator } from "../custom/categoryValidator";
import { currencySymbolCodeValidator } from "../custom/currencySymbolCodeValidator";

export { inventoriesGetValidator, inventoriesPostValidator, inventoriesPutValidator, inventoriesDeleteValidator };

const inventoriesGetValidator = [
    param("id").optional().isNumeric().withMessage("id must be a number"),
    ...paginationValidator
];

const inventoriesPostValidator = [
    body("item").trim().isLength({ min: 3, max: 75 }).withMessage("item name must be between 3 to 75 characters."),
    body("amount").optional().trim().isNumeric().withMessage("amount must be a number"),
    body("amount_unit").optional().trim().isLength({ min: 1, max: 20 }).withMessage("amount unit must be between 1 to 20 characters."),
    body("category").optional().trim().toLowerCase().custom(categoryValidator).withMessage("category must be a valid type."),
    body("color").optional().trim().isLength({ min: 2, max: 30 }).withMessage("color must be between 2 to 30 characters."),
    body("color_hex").optional().trim().isLength({ max: 7 }).isHexColor().withMessage("color_hex must be a valid hex"),
    body("cost").optional().trim().isNumeric().withMessage("cost must be a number"),
    body("cost_unit").optional().trim().custom(currencySymbolCodeValidator).withMessage("cost unit must be valid"),
];

const inventoriesPutValidator = [
    param("id").escape().notEmpty().withMessage("id is required")
    .isNumeric().withMessage("id must be a number"),
    ...inventoriesPostValidator
];

const inventoriesDeleteValidator = [
    param("id").notEmpty().withMessage("id is required")
    .isNumeric().withMessage("id must be a number"),
];