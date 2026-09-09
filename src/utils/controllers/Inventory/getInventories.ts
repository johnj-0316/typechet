import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { getAllItems, getItem } from "./Inventory";
import { InventoryGetRouteParams, InventoryGetQueryParams } from "./inventories.types";
import { handlePagination } from "../../tools/handlePagination";

export async function getInventories(
    req: Request<InventoryGetRouteParams, unknown, unknown, InventoryGetQueryParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with getting the items.", error: result.array() });
        return;
    }

    const { id } = req.params;
    const { page, limit } = req.query;

    try {
        const pq = handlePagination(page, limit);
        const data = id ? 
            await getItem(id) 
            : await getAllItems(pq.offset, pq.limit);

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