import supabase from "../../../db/supabase_client";
import { Tables, TablesInsert, TablesUpdate } from "../../../db/database.types";

import { getUser } from "../User/User";
import { handleInventoryCategory } from "../../tools/handleInventoryCategory";

export { getAllItems, getItem, createItem, editItem, deleteItem };

async function getAllItems(
    offset: number,
    limit: number
): Promise<Tables<"inventory">[]> {
    const user = await getUser();
    const { data, error } = await supabase
    .from("inventory")
    .select()
    .eq("author_id", user.id)
    .limit(limit)
    .range(offset, offset + limit);

    if (error)
        throw error;

    return data;
}

async function getItem(
    id: string
): Promise<Tables<"inventory">> {
    const user = await getUser();
    const { data, error } = await supabase
    .from("inventory")
    .select()
    .eq("id", +id)
    .eq("author_id", user.id)
    .single();

    if (error)
        throw error;

    return data;
}

// amount will default to 1
// color should be hex
// cost can be null

//refactor table and then create new types
async function createItem(
    item: string,
    category: string,
    amount?: string,
    amount_unit?: string,
    color?: string,
    color_hex?: string,
    cost?: string,
    cost_unit?: string
): Promise<TablesInsert<"inventory">> {
    const user = await getUser();
    const { data, error } = await supabase
    .from("inventory")
    .insert({ 
        item, 
        amount: amount ? +amount : 1,
        amount_unit: amount_unit || "g",
        category: handleInventoryCategory(category, item), 
        color, 
        color_hex,
        cost: cost ? +cost : null,
        cost_unit,
        author_id: user.id 
    })
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

async function editItem(
    id: string,
    item: string,
    category: string,
    amount?: string,
    amount_unit?: string,
    color?: string,
    color_hex?: string,
    cost?: string,
    cost_unit?: string
): Promise<TablesInsert<"inventory">> {
    const user = await getUser();
    const { data, error } = await supabase
    .from("inventory")
    .update({ 
        item, 
        amount: amount ? +amount : 1,
        amount_unit: amount_unit || "g",
        category: handleInventoryCategory(category, item), 
        color, 
        color_hex,
        cost: cost ? +cost : null,
        cost_unit
    })
    .eq("id", +id)
    .eq("author_id", user.id)
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

async function deleteItem(
    id: string
): Promise<void> {
    const user = await getUser();
    const { data, error } = await supabase
    .from("inventory")
    .delete()
    .eq("id", +id)
    .eq("author_id", user.id)
    .select()
    .single();

    if (error)
        throw error;
}