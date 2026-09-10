import supabase from "../../../db/supabase_client";
import { Tables, TablesInsert, TablesUpdate } from "../../../db/database.types";

import { getUser } from "../User/User";
import { handleCompositeEndpoint } from "../../tools/handleCompositeEndpoint";

export { getAllOwners, getOwnerByPattern, postOwner, editOwner, removeOwner };

// returns all owner ids of patterns that belong to user
// i.e. will return all people who saved any of your patterns
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

// return all owner ids given a pattern id
// i.e. will return all people who saved a specific pattern
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

// add a new owner
// policy requires that inserted row's pattern_id belongs to curr user first (prevent bad access)
// and requires that added user exists in table
async function postOwner(
    pattern_id: string,
    user_id: string,
    message?: string | null
 ): Promise<TablesInsert<"owners">> {
    const { data, error } = await supabase
    .from("owners")
    .insert({
        pattern_id: +pattern_id, 
        user_id, 
        message: message || null
    })
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

// edit ownership/message
// policy requires that edited row's user_id cannot be curr user
// and new pattern_id must belong to curr user first
// and requires that added user exists in table
// uses composite endpoint w comma delim
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
        message: message || null
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

// remove owner given composite endpoint w comma delim
async function removeOwner(
    compositeEndpoint: string
): Promise<void> {
    const user = await getUser();
    const [userId, patternId] = handleCompositeEndpoint(compositeEndpoint);
    const { error } = await supabase
    .from("owners")
    .delete()
    .eq("user_id", userId)
    .eq("pattern_id", +patternId)
    .neq("user_id", user.id)
    .select()
    .single();

    if (error)
        throw error;
}