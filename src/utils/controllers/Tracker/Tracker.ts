import supabase from "../../../db/supabase_client";
import { Tables, TablesInsert, TablesUpdate } from "../../../db/database.types";

import { getUser } from "../User/User";

export { getUserTrackers, getUserTracker, createTracker, editTracker, deleteTracker };

// get all trackers by id
async function getUserTrackers(
    offset: number,
    limit: number
): Promise<Tables<"trackers">[]> {
    const user = await getUser();
    const { data, error } = await supabase
    .from('trackers')
    .select()
    .eq('user_id', user.id)
    .limit(limit)
    .range(offset, offset + limit);

    if (error)
        throw error;

    return data;
}

// get tracker by id
async function getUserTracker(
    id: string
): Promise<Tables<"trackers">> {
    const user = await getUser();
    const { data, error } = await supabase
    .from('trackers')
    .select()
    .eq("id", id)
    .eq('user_id', user.id)
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
    pattern_id: string,
    current_row: string,
    current_index: string,
    is_finished: string,
    title?: string,
    current_stitch?: string,
): Promise<TablesInsert<"trackers">> {
    const user = await getUser();
    const { data, error } = await supabase
    .from("trackers")
    .insert({
        current_stitch,
        current_row: +current_row || 0, 
        current_index: +current_index || 0,
        title: title || "My Tracker",
        user_id: user.id,
        pattern_id: +pattern_id,
        is_finished: Boolean(is_finished)
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
    id: string,
    current_row: string,
    current_index: string,
    is_finished: string,
    title?: string,
    current_stitch?: string
): Promise<TablesUpdate<"trackers">> {
    const user = await getUser();
    const { data, error } = await supabase
    .from("trackers")
    .update({
        current_stitch,
        current_row: +current_row || 0, 
        current_index: +current_index || 0,
        title: title || "My Tracker",
        is_finished: Boolean(is_finished)
    })
    .eq("user_id", user.id)
    .eq("id", id)
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

// delete tracker by id
async function deleteTracker(
    id: string
): Promise<void> {
    const user = await getUser();
    const { data, error } = await supabase
    .from('trackers')
    .delete()
    .eq("id", id)
    .eq('user_id', user.id)
    .select()
    .single();

    if (error)
        throw error;
}