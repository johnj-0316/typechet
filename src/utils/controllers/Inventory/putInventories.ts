import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { editItem } from "./Inventory";
import { InventoryPutRouteParams, InventoryPutBodyParams } from "./inventories.types";

export async function putInventories(
    req: Request<InventoryPutRouteParams, unknown, InventoryPutBodyParams>, 
    res: Response
) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong editing the item.", error: result.array() });
        return;
    }

    const { id } = req.params;
    const { item, amount, amount_unit, category, color, cost } = req.body;

    try {
        const data = await editItem(id, item, amount, amount_unit, category, color, cost);
        res.status(200).json({ message: "Successfully edited the item!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong editing the item.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}