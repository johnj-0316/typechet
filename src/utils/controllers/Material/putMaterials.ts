import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { editMaterial } from "./Materials";
import { MaterialsPutRouteParams, MaterialsPutBodyParams } from "./materials.types";

export async function putMaterials(
    req: Request<MaterialsPutRouteParams, unknown, MaterialsPutBodyParams>, 
    res: Response
) {
    const { id } = req.params;
    const { pattern_id, item, amount, amount_unit, category, color, color_hex, cost, cost_unit } = req.body;
    const session = sessionUser(res);

    const data = await editMaterial(session, id, pattern_id, item, category, amount, amount_unit, color, color_hex, cost, cost_unit);
    res.status(200).json({ message: "Successfully edited the item!", data });
}