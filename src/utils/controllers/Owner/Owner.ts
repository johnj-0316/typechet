import supabase from "../../../db/supabase_client";
import { Tables } from "../../../db/database.types";

import { getUser } from "../User/User";

export { getAllOwners, getOwnerByPattern };

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
    id: string,
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
    .eq('patterns.id', +id)
    .limit(limit)
    .range(offset, offset + limit);

    if (error)
        throw error;

    return data;
}

async function postOwner() {
    
}