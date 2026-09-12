import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { getAllMaterials, getMaterial } from "./Materials";
import { MaterialsGetRouteParams, MaterialsGetQueryParams } from "./materials.types";
import { handlePagination } from "../../tools/handlePagination";
import { handleMaterialEndpoint } from "../../tools/handleMaterialEndpoint";

export async function getMaterials(
    req: Request<MaterialsGetRouteParams, unknown, unknown, MaterialsGetQueryParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with getting the items.", error: result.array() });
        return;
    }

    const { pattern_id_material_id } = req.params;
    const { page, limit } = req.query;

    try {
        const [pattern_id, material_id] = handleMaterialEndpoint(pattern_id_material_id);
        const pq = handlePagination(page, limit);
        const data = material_id ? 
            await getMaterial(material_id, pattern_id) 
            : await getAllMaterials(pattern_id, pq.offset, pq.limit);

        if (!data || (Array.isArray(data) && !data.length)) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json({ message: "Found all items!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with getting the items.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}