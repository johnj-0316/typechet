import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { deleteMaterial } from "../../services/materialServices";
import { MaterialsDeleteRouteParams } from "./materials.types";
import { handleMaterialEndpoint } from "../../tools/handleMaterialEndpoint";
import { ClientError } from "../../errors/Error";

export async function deleteMaterials(
    req: Request<MaterialsDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const { pattern_id_material_id } = req.params;
    const session = sessionUser(res);

    const [pattern_id, material_id] = handleMaterialEndpoint(pattern_id_material_id);

    if (!pattern_id || !material_id)
        throw new ClientError("Missing pattern or material id parameter.", 400);

    await deleteMaterial(session, material_id, pattern_id);
    res.sendStatus(204);
}