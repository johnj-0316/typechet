import { Router } from "express";
import { body, param, query } from "express-validator";

import { getInventories } from "../controllers/Inventory/getInventories";
import { postInventories } from "../controllers/Inventory/postInventories";
import { putInventories } from "../controllers/Inventory/putInventories";
import { deleteInventories } from "../controllers/Inventory/deleteInventories";
import { categoryValidator } from "../tools/categoryValidator";
import { currencySymbolCodeValidator } from "../tools/currencySymbolCodeValidator";

export const inventoryRouter = Router();

inventoryRouter.get(["/", "/:id"], [
    param("id").optional().escape().isNumeric().withMessage("id must be a number"),
    query("offset").optional().escape().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().escape().isNumeric().withMessage("limit must be a number")
], getInventories);

inventoryRouter.post("/", [
    body("item").escape().trim().isLength({ min: 3, max: 75 }).withMessage("item name must be between 3 to 75 characters."),
    body("amount").optional().escape().trim().isNumeric().withMessage("amount must be a number"),
    body("amount_unit").optional().escape().trim().isLength({ min: 1, max: 5 }).withMessage("amount unit must be between 1 to 5 characters."),
    body("category").optional().escape().trim().custom(categoryValidator).withMessage("category must be a valid type."),
    body("color").optional().escape().trim().isLength({ min: 2, max: 30 }).withMessage("color must be between 2 to 30 characters."),
    body("color_hex").optional().escape().trim().isLength({ max: 7 }).isHexColor().withMessage("color_hex must be a valid hex"),
    body("cost").optional().escape().trim().isNumeric().withMessage("cost must be a number"),
    body("cost_unit").optional().escape().trim().custom(currencySymbolCodeValidator).withMessage("cost unit must be valid"),
], postInventories);

inventoryRouter.put("/:id", [
    param("id").escape().notEmpty().withMessage("id is required")
    .isNumeric().withMessage("id must be a number"),
    body("item").escape().trim().isLength({ min: 3, max: 75 }).withMessage("title must be between 3 to 75 characters."),
    body("amount").optional().escape().trim().isNumeric().withMessage("amount must be a number"),
    body("amount_unit").optional().escape().trim().isLength({ min: 1, max: 5 }).withMessage("amount unit must be between 1 to 5 characters."),
    body("category").optional().escape().trim().custom(categoryValidator).withMessage("category must be a valid type."),
    body("color").optional().escape().trim().isLength({ min: 2, max: 30 }).withMessage("color must be between 2 to 30 characters."),
    body("color_hex").optional().escape().trim().isLength({ max: 7 }).isHexColor().withMessage("color_hex must be a valid hex"),
    body("cost").optional().escape().trim().isNumeric().withMessage("cost must be a number"),
    body("cost_unit").optional().escape().trim().custom(currencySymbolCodeValidator).withMessage("cost unit must be a valid"),
], putInventories);

inventoryRouter.delete("/:id", [
    param("id").escape().notEmpty().withMessage("id is required")
    .isNumeric().withMessage("id must be a number"),
], deleteInventories);