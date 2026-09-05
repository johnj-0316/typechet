import supabase from "../../../db/supabase_client";

import { getUser } from "../User/User";
import { TablesInsert } from "../../../db/database.types";

export { createPattern };

type Pair = Record<string, string>;

// rows are 0 indexed
//  -index 0 should be color -> base
//  -index 1 should be first row
//  -on color change, index should be color -> row

// colors should be color: hex string
async function createPattern(
    rows: string[], 
    colors: Pair, 
    sizes: Pair, 
    materials: string[]
): Promise<TablesInsert<'patterns'>> {
    const user = await getUser();
    const { data, error } = await supabase
    .from("patterns")
    .insert({rows, colors, sizes, materials, author_id: user.id})
    .select()
    .single();

    if (error)
        throw error;

    return data;
}