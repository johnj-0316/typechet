import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { createMaterial } from "./Materials";
import { MaterialsPostBodyParams } from "./materials.types";

export async function postMaterials(
    req: Request<unknown, unknown, MaterialsPostBodyParams>, 
    res: Response
): Promise<void> {
    const { pattern_id, item, amount, amount_unit, category, color, color_hex, cost, cost_unit } = req.body;
    const session = sessionUser(res);
    
    const data = await createMaterial(session, pattern_id, item, category, amount, amount_unit, color, color_hex, cost, cost_unit);
    res.status(201).json({ message: "Item succesfully added!", data });
}