import { Request, Response } from 'express';

import { sessionUser } from '../User/sessionUser';
import { createItem } from '../../services/inventoryServices';
import { InventoryPostBodyParams } from './inventories.types';

export async function postInventories(
    req: Request<unknown, unknown, InventoryPostBodyParams>,
    res: Response,
): Promise<void> {
    const { item, amount, amount_unit, category, color, color_hex, cost, cost_unit } = req.body;
    const userId = sessionUser(req);

    const data = await createItem(
        userId,
        item,
        category,
        amount,
        amount_unit,
        color,
        color_hex,
        cost,
        cost_unit,
    );
    res.status(201).json({ message: 'Item successfully added!', data });
}
