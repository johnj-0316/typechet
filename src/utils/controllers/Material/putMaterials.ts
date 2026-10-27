import { Request, Response } from 'express';

import { sessionUser } from '../User/sessionUser';
import { editMaterial } from '../../services/materialServices';
import { MaterialsPutRouteParams, MaterialsPutBodyParams } from './materials.types';

export async function putMaterials(
    req: Request<MaterialsPutRouteParams, unknown, MaterialsPutBodyParams>,
    res: Response,
) {
    const { id } = req.params;
    const { pattern_id, item, amount, amount_unit, category, color, color_hex, cost, cost_unit } =
        req.body;
    const userId = sessionUser(req);

    const data = await editMaterial({
        userId,
        id,
        patternId: pattern_id,
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
