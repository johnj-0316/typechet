import supabase from "../../../db/supabase_client";
import { Tables, TablesInsert, TablesUpdate } from "../../../db/database.types";

import { getUser } from "../User/User";
import { handleCompositeEndpoint } from "../../tools/handleCompositeEndpoint";

export { getAllOwners, getOwnerByPattern, postOwner, editOwner };

async function getAllOwners(
    offset: number,
    limit: number
): Promise<Pick<Tables<"owners">, "user_id">[]> {
    const user = await getUser();
    const { data, error } = await supabase
    .from('owners')
    .select(
        `
        user_id,
        ...patterns!inner()
        `,
    )
    .eq('patterns.author_id', user.id)
    .order("user_id")
    .limit(limit)
    .range(offset, offset + limit);

    if (error)
        throw error;

    return data;
}

async function getOwnerByPattern(
    pattern_id: string,
    offset: number,
    limit: number
): Promise<Pick<Tables<"owners">, "user_id">[]> {
    const user = await getUser();
    const { data, error } = await supabase
    .from('owners')
    .select(
        `
        user_id,
        ...patterns!inner()
        `,
    )
    .eq('patterns.author_id', user.id)
    .eq('patterns.id', +pattern_id)
    .limit(limit)
    .range(offset, offset + limit);

    if (error)
        throw error;

    return data;
}

async function postOwner(
    pattern_id: string,
    user_id: string,
    message?: string | null
 ): Promise<TablesInsert<"owners">> {
    const { data, error } = await supabase
    .from("owners")
    .insert({pattern_id: +pattern_id, user_id, message: message})
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

async function editOwner(
    compositeEndpoint: string,
    pattern_id: string,
    user_id: string,
    message?: string | null
): Promise<TablesUpdate<"owners">> {
    const user = await getUser();
    const [userId, patternId] = handleCompositeEndpoint(compositeEndpoint);
    const { data, error } = await supabase
    .from("owners")
    .update({
        user_id,
        pattern_id: +pattern_id,
        message
    })
    .eq("user_id", userId)
    .eq("pattern_id", +patternId)
    .neq("user_id", user.id)
    .select()
    .single();

    if (error)
        throw error;

    return data;
}