import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { getAllMaterials, getMaterial } from "./Materials";
import { MaterialsGetRouteParams, MaterialsGetQueryParams } from "./materials.types";
import { handlePagination } from "../../tools/handlePagination";
import { handleMaterialEndpoint } from "../../tools/handleMaterialEndpoint";

export async function getMaterials(
    req: Request<MaterialsGetRouteParams, unknown, unknown, MaterialsGetQueryParams>, 
    res: Response
): Promise<void> {
    const { pattern_id_material_id } = req.params;
    const { offset, limit } = req.query;
    const session = sessionUser(res);
    const [pattern_id, material_id] = handleMaterialEndpoint(pattern_id_material_id);
    
    const pq = handlePagination(offset, limit);
    const data = material_id ? 
        await getMaterial(session, material_id, pattern_id) 
        : await getAllMaterials(session, pattern_id, pq.offset, pq.limit);

    res.status(201).json({ message: "Found all items!", data });
}