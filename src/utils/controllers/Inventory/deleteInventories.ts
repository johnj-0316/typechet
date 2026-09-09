import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { deleteItem } from "./Inventory";
import { InventoryDeleteRouteParams } from "./inventories.types";

export async function deleteInventories(
    req: Request<InventoryDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with removing the item.", error: result.array() });
        return;
    }

    const { id } = req.params;

    try {
        if (id === "") {
            res.status(400).json({ message: "Something went wrong with removing the item.", error: "id field is missing or invalid." });
            return;
        }

        await deleteItem(id);
        res.sendStatus(204);
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with removing the item.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}