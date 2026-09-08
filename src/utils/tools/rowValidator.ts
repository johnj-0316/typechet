import { CustomValidator } from "express-validator";

import { getUserStitches } from "../controllers/Stitch/Stitch";

// async validators do not count false returns as reject
// must throw error to invalidate input
export const rowValidator: CustomValidator = async (
    rows: string[]
) => {
    const data = await getUserStitches(0, 100);
    const cleanRows = rowCleaner(rows);
    const stitchSet = new Set(data.map(value => value.shorthand.trim().toLowerCase()));

    if (cleanRows.every(stitch => stitchSet.has(stitch)))
        return;

    throw new Error();
}

function rowCleaner(
    rows: string[]
): string[] {
    return rows.map(stitch => stitch.replaceAll(/\d+/g, ""));
}