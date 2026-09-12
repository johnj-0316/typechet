import { CustomValidator } from "express-validator";

import { getUserStitches } from "../controllers/Stitch/Stitch";

// async validators do not count false returns as reject
// must throw error to invalidate input

/*
finish after frontend
Valid format: 
[
    ["ch3 ch2", "skip the next step if done", "mr 5sc"]
]
*/
export const rowValidator: CustomValidator = async (
    rows: string[]
) => {
    // queries are limited to 100 by supabase anyway
    const data = await getUserStitches(0, 100);

    // removes numbers from row
    const cleanRows = rows.map(stitch => stitch.replaceAll(/\d+/g, " "));
    const cleanStitches = cleanRows.map(row => row.split(" ").map(stitch => stitch.trim().toLowerCase())).flat();
    const stitchSet = new Set(data.map(value => value.shorthand.trim().toLowerCase()));

    if (cleanStitches.every(stitch => stitchSet.has(stitch)))
        return;

    throw new Error();
}