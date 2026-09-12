import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { editMaterial } from "./Materials";
import { MaterialsPutRouteParams, MaterialsPutBodyParams } from "./materials.types";

export async function putMaterials(
    req: Request<MaterialsPutRouteParams, unknown, MaterialsPutBodyParams>, 
    res: Response
) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong editing the item.", error: result.array() });
        return;
    }

    const { id } = req.params;
    const { pattern_id, item, amount, amount_unit, category, color, color_hex, cost, cost_unit } = req.body;

    try {
        const data = await editMaterial(id, pattern_id, item, category, amount, amount_unit, color, color_hex, cost, cost_unit);
        res.status(200).json({ message: "Successfully edited the item!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong editing the item.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}