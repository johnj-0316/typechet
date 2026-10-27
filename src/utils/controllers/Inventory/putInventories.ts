import { Request, Response } from 'express';

import { sessionUser } from '../User/sessionUser';
import { editItem } from '../../services/inventoryServices';
import { InventoryPutRouteParams, InventoryPutBodyParams } from './inventories.types';

export async function putInventories(
    req: Request<InventoryPutRouteParams, unknown, InventoryPutBodyParams>,
    res: Response,
) {
    const { id } = req.params;
    const { item, amount, amount_unit, category, color, color_hex, cost, cost_unit } = req.body;
    const userId = sessionUser(req);

    const data = await editItem({
        userId,
        id,
        item,
        category,
        amount,
        amountUnit: amount_unit,
        color,
        colorHex: color_hex,
        cost,
        costUnit: cost_unit,
    });
    res.status(200).json({ message: 'Successfully edited the item!', data });
}
