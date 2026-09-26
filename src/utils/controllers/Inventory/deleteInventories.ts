import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { deleteItem } from "./Inventory";
import { InventoryDeleteRouteParams } from "./inventories.types";
import { ClientError } from "../../errors/Error";

export async function deleteInventories(
    req: Request<InventoryDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const { id } = req.params;
    const session = sessionUser(res);

    if (id === "")
        throw new ClientError("Missing id parameter.", 400);

    await deleteItem(session, id);
    res.sendStatus(204);
}