import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { createItem } from "./Inventory";
import { InventoryPostBodyParams } from "./inventories.types";

export async function postInventories(
    req: Request<any, unknown, InventoryPostBodyParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with adding the items.", error: result.array() });
        return;
    }

    const { item, amount, category, color, cost } = req.body;

    try {
        //res.status(200).json({item,amount,category,color,cost});
        //return;
        const data = await createItem(item, amount, category, color, cost);
        res.status(200).json({ message: "Item succesfully added!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with adding the items.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}