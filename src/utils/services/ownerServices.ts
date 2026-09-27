import { Tables, TablesInsert, TablesUpdate } from "../../db/database.types";
import { handleOwnerEndpoint } from "../tools/handleOwnerEndpoint";
import { UserAuthContext } from "../controllers/User/users.types";

export { getAllOwners, getOwnerByPattern, postOwner, editOwner, deleteOwner };

// returns all owner ids of patterns that belong to user
// i.e. will return all people who saved any of your patterns
async function getAllOwners(
    session: UserAuthContext,
    offset: number,
    limit: number
): Promise<Pick<Tables<"owners">, "user_id">[]> {
    const { data, error } = await session.supabase
    .from('owners')
    .select(
        `
        user_id,
        ...patterns!inner()
        `,
    )
    .eq('patterns.author_id', session.userId)
    .order("user_id")
    .limit(limit)
    .range(offset, offset + limit - 1);

    if (error) {
        if (error.code.includes("116"))
            return [];
        
        throw error;
    }

    return data;
}

// return all owner ids given a pattern id
// i.e. will return all people who saved a specific pattern
async function getOwnerByPattern(
    session: UserAuthContext,
    pattern_id: string,
    offset: number,
    limit: number
): Promise<Pick<Tables<"owners">, "user_id">[]> {
    const { data, error } = await session.supabase
    .from('owners')
    .select(
        `
        user_id,
        ...patterns!inner()
        `,
    )
    .eq('patterns.author_id', session.userId)
    .eq('patterns.id', +pattern_id)
    .limit(limit)
    .range(offset, offset + limit - 1);

    if (error)
        throw error;

    return data;
}

// add a new owner
// policy requires that inserted row's pattern_id belongs to curr user first (prevent bad access)
// and requires that added user exists in table
async function postOwner(
    session: UserAuthContext,
    pattern_id: string,
    user_id: string,
    message?: string | null
 ): Promise<TablesInsert<"owners">> {
    const { data, error } = await session.supabase
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
    session: UserAuthContext,
    compositeEndpoint: string,
    pattern_id: string,
    user_id: string,
    message?: string | null
): Promise<TablesUpdate<"owners">> {
    const [userId, patternId] = handleOwnerEndpoint(compositeEndpoint);
    const { data, error } = await session.supabase
    .from("owners")
    .update({
        user_id,
        pattern_id: +pattern_id,
        message: message || null
    })
    .eq("user_id", userId)
    .eq("pattern_id", +patternId)
    .neq("user_id", session.userId)
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

// remove owner given composite endpoint w comma delim
async function deleteOwner(
    session: UserAuthContext,
    compositeEndpoint: string
): Promise<void> {
    const [userId, patternId] = handleOwnerEndpoint(compositeEndpoint);
    const { error } = await session.supabase
    .from("owners")
    .delete()
    .eq("user_id", userId)
    .eq("pattern_id", +patternId)
    .neq("user_id", session.userId)
    .select()
    .single();

    if (error)
        throw error;
}