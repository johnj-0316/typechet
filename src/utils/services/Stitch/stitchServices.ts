import { Tables, TablesInsert, TablesUpdate } from "../../../db/database.types";
import { UserAuthContext } from "../User/users.types";

export { getUserStitches, getUserStitch, createStitch, editStitch, deleteStitch };

// get all stitches paginated
async function getUserStitches(
    session: UserAuthContext,
    offset: number,
    limit: number
): Promise<Tables<"stitches">[]> {
    const { data, error } = await session.supabase
    .from('stitches')
    .select()
    .or(`custom.eq.FALSE, author_id.eq.${session.userId}`)
    .limit(limit)
    .range(offset, offset + limit - 1);

    if (error)
        throw error;

    return data;
}

// get all stitches by id
async function getUserStitch(
    session: UserAuthContext,
    id: string
): Promise<Tables<"stitches">> {
    const { data, error } = await session.supabase
    .from('stitches')
    .select()
    .eq("id", +id)
    .or(`custom.eq.FALSE, author_id.eq.${session.userId}`)
    .single();

    if (error)
        throw error;

    return data;
}

async function createStitch(
    session: UserAuthContext,
    shorthand: string,
    name: string,
    origin?: string
): Promise<TablesInsert<"stitches">> {
    const { data, error } = await session.supabase
    .from("stitches")
    .insert({ 
        shorthand, 
        name, 
        origin: origin || "US", 
        author_id: session.userId 
    })
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

async function editStitch(
    session: UserAuthContext,
    id: string,
    shorthand: string,
    name: string,
    origin?: string
): Promise<TablesUpdate<"stitches">> {
    const { data, error } = await session.supabase
    .from("stitches")
    .update({ 
        shorthand, 
        name, 
        origin: origin || "US"
    })
    .eq("author_id", session.userId)
    .eq("id", +id)
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

async function deleteStitch(
    session: UserAuthContext,
    id: string
): Promise<void> {
    const { error } = await session.supabase
    .from("stitches")
    .delete()
    .eq("author_id", session.userId)
    .eq("id", +id)
    .select()
    .single();

    if (error)
        throw error;
}