import { Router } from "express";
import { body, param, query } from "express-validator";

import { getMaterials } from "../controllers/Material/getMaterials";
import { postMaterials } from "../controllers/Material/postMaterials";
import { putMaterials } from "../controllers/Material/putMaterials";
import { deleteMaterials } from "../controllers/Material/deleteMaterials";
import { categoryValidator } from "../tools/categoryValidator";
import { currencySymbolCodeValidator } from "../tools/currencySymbolCodeValidator";
import { materialEndpointValidator } from "../tools/materialEndpointValidator";

export const materialRouter = Router();

materialRouter.get(["/", "/:pattern_id_material_id"], [
    param("pattern_id_material_id").optional().escape().custom(materialEndpointValidator).withMessage("pattern and material id must be a valid"),
    query("offset").optional().escape().isNumeric().withMessage("offset must be a number"),
    query("limit").optional().escape().isNumeric().withMessage("limit must be a number")
], getMaterials);

materialRouter.post("/", [
    body("pattern_id").escape().trim().notEmpty().withMessage("pattern id is required")
    .isNumeric().withMessage("pattern id must be a number"),
    body("item").escape().trim().isLength({ min: 3, max: 75 }).withMessage("item name must be between 3 to 75 characters."),
    body("amount").optional().escape().trim().isNumeric().withMessage("amount must be a number"),
    body("amount_unit").optional().escape().trim().isLength({ min: 1, max: 5 }).withMessage("amount unit must be between 1 to 5 characters."),
    body("category").optional().escape().trim().custom(categoryValidator).withMessage("category must be a valid type."),
    body("color").optional().escape().trim().isLength({ min: 2, max: 30 }).withMessage("color must be between 2 to 30 characters."),
    body("color_hex").optional().escape().trim().isLength({ max: 7 }).isHexColor().withMessage("color_hex must be a valid hex"),
    body("cost").optional().escape().trim().isNumeric().withMessage("cost must be a number"),
    body("cost_unit").optional().escape().trim().custom(currencySymbolCodeValidator).withMessage("cost unit must be valid"),
], postMaterials);

materialRouter.put("/:id", [
    param("id").escape().notEmpty().withMessage("material id is required")
    .isNumeric().withMessage("material id must be a number"),
    body("pattern_id").escape().trim().notEmpty().withMessage("pattern id is required")
    .isNumeric().withMessage("pattern id must be a number"),
    body("item").escape().trim().isLength({ min: 3, max: 75 }).withMessage("title must be between 3 to 75 characters."),
    body("amount").optional().escape().trim().isNumeric().withMessage("amount must be a number"),
    body("amount_unit").optional().escape().trim().isLength({ min: 1, max: 5 }).withMessage("amount unit must be between 1 to 5 characters."),
    body("category").optional().escape().trim().custom(categoryValidator).withMessage("category must be a valid type."),
    body("color").optional().escape().trim().isLength({ min: 2, max: 30 }).withMessage("color must be between 2 to 30 characters."),
    body("color_hex").optional().escape().trim().isLength({ max: 7 }).isHexColor().withMessage("color_hex must be a valid hex"),
    body("cost").optional().escape().trim().isNumeric().withMessage("cost must be a number"),
    body("cost_unit").optional().escape().trim().custom(currencySymbolCodeValidator).withMessage("cost unit must be a valid"),
], putMaterials);

materialRouter.delete("/:pattern_id_material_id", [
    param("pattern_id_material_id").escape().notEmpty().custom(materialEndpointValidator).withMessage("pattern and material id must be a valid"),
], deleteMaterials);