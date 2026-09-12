import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { deleteMaterial } from "./Materials";
import { MaterialsDeleteRouteParams } from "./materials.types";
import { handleMaterialEndpoint } from "../../tools/handleMaterialEndpoint";

export async function deleteMaterials(
    req: Request<MaterialsDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with removing the item.", error: result.array() });
        return;
    }

    const { pattern_id_material_id } = req.params;

    try {
        const [pattern_id, material_id] = handleMaterialEndpoint(pattern_id_material_id);

        if (!pattern_id || !material_id) {
            res.status(400).json({ message: "Something went wrong with removing the item.", error: "id fields are missing or invalid." });
            return;
        }

        await deleteMaterial(material_id, pattern_id);
        res.sendStatus(204);
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with removing the item.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}