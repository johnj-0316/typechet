import supabase from "../../../db/supabase_client";

import { getUser } from "../User/User";
import { Tables, TablesInsert } from "../../../db/database.types";
import { Pair } from "./pattern.types";

export { createPattern, getAllPatterns, getPattern, handlePagination };

// rows are 0 indexed
//  -index 0 should be color -> base
//  -index 1 should be first row
//  -on color change, index should be color -> row

// colors should be color: hex string

// find patterns by selecting owners and doing join with patterns,
// where owners.user_id = supabase session id

// pages are 1 indexed
function handlePagination(
    pageQuery: string | void, 
    limitQuery: string | void = "10"
): {
    offset: number,
    limit: number
} {
    const limit = Math.round(+limitQuery);

    // default value on no page specified
    if (!pageQuery) {
        return {
            offset: 0,
            limit
        };
    }

    const offset = limit * (Math.round(+pageQuery) - 1);

    if (offset < 0)
        throw new Error("Invalid page query");

    if (limit <= 0 || limit > 50)
        throw new Error("Invalid limit query");

    return { offset, limit };
}

// page and limit safe as numbers because of handlePagination
// returns all patterns that match session id
async function getAllPatterns(
    offset: number,
    limit: number
): Promise<Tables<'patterns'>[]> {
    const user = await getUser();
    // range is inclusive
    const { data, error } = await supabase
    .from('owners')
    .select('...patterns!inner(*)')
    .eq('user_id', user.id)
    .limit(limit)
    .range(offset, offset + limit - 1);

    if (error)
        throw error;

    return data;
}

// returns all patterns that match id param AND session id
// only returns < 1 row, does not need pagination
async function getPattern(
    id: string
): Promise<Tables<'patterns'>> {
    const user = await getUser();
    const { data, error } = await supabase
    .from('owners')
    .select('...patterns!inner(*)')
    .eq('user_id', user.id)
    .eq('pattern_id', +id)
    .single();

    if (error)
        throw error;

    return data;
}

// insert pattern
async function createPattern(
    title: string,
    rows: string[], 
    colors: Pair, 
    sizes: Pair, 
    materials: string[],
): Promise<TablesInsert<'patterns'>> {
    const user = await getUser();
    const { data, error } = await supabase
    .from("patterns")
    .insert({title, rows, colors, sizes, materials, author_id: user.id})
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

