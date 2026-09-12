import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { createMaterial } from "./Materials";
import { MaterialsPostBodyParams } from "./materials.types";

export async function postMaterials(
    req: Request<any, unknown, MaterialsPostBodyParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with adding the items.", error: result.array() });
        return;
    }

    const { pattern_id, item, amount, amount_unit, category, color, color_hex, cost, cost_unit } = req.body;

    try {
        const data = await createMaterial(pattern_id, item, category, amount, amount_unit, color, color_hex, cost, cost_unit);
        res.status(200).json({ message: "Item succesfully added!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with adding the items.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}