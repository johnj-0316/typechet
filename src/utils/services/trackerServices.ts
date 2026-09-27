import { Tables, TablesInsert, TablesUpdate } from "../../db/database.types";
import { UserAuthContext } from "../controllers/User/users.types";

export { getUserTrackers, getUserTracker, createTracker, editTracker, deleteTracker };

// get all trackers by id
async function getUserTrackers(
    session: UserAuthContext,
    offset: number,
    limit: number
): Promise<Tables<"trackers">[]> {
    const { data, error } = await session.supabase
    .from('trackers')
    .select()
    .eq('user_id', session.userId)
    .limit(limit)
    .range(offset, offset + limit - 1);

    if (error) {
        if (error.code.includes("116"))
            return [];
        
        throw error;
    }

    return data;
}

// get tracker by id
async function getUserTracker(
    session: UserAuthContext,
    id: string
): Promise<Tables<"trackers">> {
    const { data, error } = await session.supabase
    .from('trackers')
    .select()
    .eq("id", id)
    .eq('user_id', session.userId)
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

// requires both restrictive and permissive policy
// one for insert and crud respectively
// row and index default to 0, title defaults, and stitch can be null
async function createTracker(
    session: UserAuthContext,
    pattern_id: string,
    current_row: string,
    current_index: string,
    is_finished: boolean,
    title?: string,
    current_stitch?: string,
): Promise<TablesInsert<"trackers">> {
    const { data, error } = await session.supabase
    .from("trackers")
    .insert({
        current_stitch,
        current_row: +current_row || 0, 
        current_index: +current_index || 0,
        title: title || "My Tracker",
        user_id: session.userId,
        pattern_id: +pattern_id,
        is_finished
    })
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

// update tracker by id
// would not make sense to edit the pattern_id after creation
async function editTracker(
    session: UserAuthContext,
    id: string,
    current_row: string,
    current_index: string,
    is_finished: boolean,
    title?: string,
    current_stitch?: string
): Promise<TablesUpdate<"trackers">> {
    const { data, error } = await session.supabase
    .from("trackers")
    .update({
        current_stitch,
        current_row: +current_row || 0, 
        current_index: +current_index || 0,
        title: title || "My Tracker",
        is_finished
    })
    .eq("user_id", session.userId)
    .eq("id", id)
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

// delete tracker by id
async function deleteTracker(
    session: UserAuthContext,
    id: string
): Promise<void> {
    const { error } = await session.supabase
    .from('trackers')
    .delete()
    .eq("id", id)
    .eq('user_id', session.userId)
    .select()
    .single();

    if (error)
        throw error;
}