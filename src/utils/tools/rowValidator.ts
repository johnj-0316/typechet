import supabase from "../../db/supabase_client";
import { CustomValidator } from "express-validator";

import { getUser } from "../controllers/User/User";

// async validators do not count false returns as reject
// must throw error to invalidate input
export const rowValidator: CustomValidator = async (
    rows: string[]
) => {
    const user = await getUser();
    const { data, error } = await supabase
    .from('stitches')
    .select('shorthand')
    .or(`author_id.eq.${user.id},custom.is.false`);

    if (error)
        throw error;

    const cleanRows = rowCleaner(rows);
    const stitchSet = new Set(data.map(value => value.shorthand));

    if (cleanRows.every(stitch => stitchSet.has(stitch)))
        return;

    throw new Error();
}

function rowCleaner(
    rows: string[]
): string[] {
    return rows.map(stitch => stitch.replaceAll(/\d+/g, ""));
}