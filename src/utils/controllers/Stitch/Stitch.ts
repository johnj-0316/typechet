import supabase from "../../../db/supabase_client";

import { Tables, TablesInsert } from "../../../db/database.types";

import { getUser } from "../User/User";

export { getUserStitches, getUserStitch, createStitch, editStitch, deleteStitch };

async function getUserStitches(
    offset: number,
    limit: number
): Promise<Tables<"stitches">[]> {
    const user = await getUser();
    const { data, error } = await supabase
    .from('stitches')
    .select()
    .or(`custom.eq.FALSE, author_id.eq.${user.id}`)
    .limit(limit)
    .range(offset, offset + limit);

    if (error)
        throw error;

    return data;
}

async function getUserStitch(
    id: string
): Promise<Tables<"stitches">> {
    const user = await getUser();
    const { data, error } = await supabase
    .from('stitches')
    .select()
    .eq("id", +id)
    .or(`custom.eq.FALSE, author_id.eq.${user.id}`)
    .single();

    if (error)
        throw error;

    return data;
}

async function createStitch(
    shorthand: string,
    name: string,
    origin: string
): Promise<TablesInsert<"stitches">> {
    const user = await getUser();
    const { data, error } = await supabase
    .from("stitches")
    .insert({ shorthand, name, origin, author_id: user.id })
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

async function editStitch(
    id: string,
    shorthand: string,
    name: string,
    origin: string
): Promise<TablesInsert<"stitches">> {
    const user = await getUser();
    const { data, error } = await supabase
    .from("stitches")
    .update({ shorthand, name, origin, author_id: user.id })
    .eq("author_id", user.id)
    .eq("id", +id)
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

async function deleteStitch(
    id: string
): Promise<void> {
    const user = await getUser();
    const { error } = await supabase
    .from("stitches")
    .delete()
    .eq("author_id", user.id)
    .eq("id", +id);

    if (error)
        throw error;
}