import supabase from "../../../db/supabase_client";
import { Tables, TablesInsert } from "../../../db/database.types";

import { getUser } from "../User/User";

export { getAllOwners, getOwnerByPattern, postOwner };

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
) {}