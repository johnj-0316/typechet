import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { deleteItem } from "../../services/inventoryServices";
import { InventoryDeleteRouteParams } from "./inventories.types";
import { ClientError } from "../../errors/Error";

export async function deleteInventories(
    req: Request<InventoryDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const { id } = req.params;
    const userId = sessionUser(req);

    if (id === "")
        throw new ClientError("Missing id parameter.", 400);

    await deleteItem(userId, id);
    res.sendStatus(204);
}
