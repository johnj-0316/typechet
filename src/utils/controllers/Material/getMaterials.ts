import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { getAllMaterials, getMaterial } from "../../services/materialServices";
import { MaterialsGetRouteParams, MaterialsGetQueryParams } from "./materials.types";
import { handlePagination } from "../../tools/handlePagination";
import { handleMaterialEndpoint } from "../../tools/handleMaterialEndpoint";

export async function getMaterials(
    req: Request<MaterialsGetRouteParams, unknown, unknown, MaterialsGetQueryParams>, 
    res: Response
): Promise<void> {
    const { pattern_id_material_id } = req.params;
    const { offset, limit } = req.query;
    const userId = sessionUser(req);
    const [pattern_id, material_id] = handleMaterialEndpoint(pattern_id_material_id);
    
    const pq = handlePagination(offset, limit);
    const data = material_id ? 
        await getMaterial(userId, material_id, pattern_id)
        : await getAllMaterials(userId, pattern_id, pq.offset, pq.limit);

    res.status(200).json({ message: "Found all items!", data });
}
