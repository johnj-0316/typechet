import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { editItem } from "./Inventory";
import { InventoryPutRouteParams, InventoryPutBodyParams } from "./inventories.types";

export async function putInventories(
    req: Request<InventoryPutRouteParams, unknown, InventoryPutBodyParams>, 
    res: Response
) {
    const { id } = req.params;
    const { item, amount, amount_unit, category, color, color_hex, cost, cost_unit } = req.body;
    const session = sessionUser(res);

    const data = await editItem(session, id, item, category, amount, amount_unit, color, color_hex, cost, cost_unit);
    res.status(200).json({ message: "Successfully edited the item!", data });
}