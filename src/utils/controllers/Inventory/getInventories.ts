import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { getAllItems, getItem } from "./Inventory";
import { InventoryGetRouteParams, InventoryGetQueryParams } from "./inventories.types";
import { handlePagination } from "../../tools/handlePagination";

export async function getInventories(
    req: Request<InventoryGetRouteParams, unknown, unknown, InventoryGetQueryParams>, 
    res: Response
): Promise<void> {
    const { id } = req.params;
    const { offset, limit } = req.query;
    const session = sessionUser(res);

    const pq = handlePagination(offset, limit);
    const data = id ? 
        await getItem(session, id) 
        : await getAllItems(session, pq.offset, pq.limit);

    res.status(200).json({ message: "Found all items!", data });
}