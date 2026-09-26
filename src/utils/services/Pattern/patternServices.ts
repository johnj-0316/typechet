import { Tables, TablesInsert } from "../../../db/database.types";
import { UserAuthContext } from "../User/users.types";

export { getAllPatterns, getPattern, createPattern, editPattern, deletePattern };

// rows are 0 indexed
//  -index 0 should be color -> base
//  -index 1 should be first row
//  -on color change, index should be color -> row

// colors should be color: hex string

// find patterns by selecting owners and doing join with patterns,
// where owners.user_id = supabase session id

// page and limit safe as numbers because of handlePagination
// returns all patterns that match session id
async function getAllPatterns(
    session: UserAuthContext,
    offset: number,
    limit: number
): Promise<Tables<'patterns'>[]> {
    // range is inclusive
    const { data, error } = await session.supabase
    .from('owners')
    .select('...patterns!inner(*)')
    .eq('user_id', session.userId)
    .limit(limit)
    .range(offset, offset + limit - 1);

    if (error)
        throw error;

    return data;
}

// returns all patterns that match id param AND session id
// only returns < 1 row, does not need pagination
async function getPattern(
    session: UserAuthContext,
    id: string
): Promise<Tables<'patterns'>> {
    const { data, error } = await session.supabase
    .from('owners')
    .select('...patterns!inner(*)')
    .eq('user_id', session.userId)
    .eq('pattern_id', +id)
    .single();

    if (error)
        throw error;

    return data;
}

// insert pattern
async function createPattern(
    session: UserAuthContext,
    title: string,
    rows: string[],
    is_editing: boolean
): Promise<TablesInsert<'patterns'>> {
    const { data, error } = await session.supabase
    .from("patterns")
    .insert({
        title: title || "Untitled Pattern", 
        rows, 
        is_editing,
        author_id: session.userId
    })
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

// edit patten
async function editPattern(
    session: UserAuthContext,
    id: string,
    title: string,
    rows: string[],
    is_editing: boolean
): Promise<TablesInsert<'patterns'>> {
    const { data, error } = await session.supabase
    .from("patterns")
    .update({
        title: title || "Untitled Pattern", 
        rows, 
        is_editing,
    })
    .eq("author_id", session.userId)
    .eq("id", +id)
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

// delete pattern that belongs to user
async function deletePattern(
    session: UserAuthContext,
    id: string
): Promise<void> {
    const { error } = await session.supabase
    .from("patterns")
    .delete()
    .eq("author_id", session.userId)
    .eq("id", +id)
    .select()
    .single();

    if (error)
        throw error;
}

