import { Tables, TablesInsert, TablesUpdate } from "../../db/database.types";
import { handleInventoryCategory } from "../tools/handleInventoryCategory";
import { handleHexCodeConversion } from "../tools/handleHexCodeConversion";
import { UserAuthContext } from "../controllers/User/users.types";

export { getAllItems, getItem, createItem, editItem, deleteItem };

async function getAllItems(
    session: UserAuthContext,
    offset: number,
    limit: number
): Promise<Tables<"inventory">[]> {
    const { data, error } = await session.supabase
    .from("inventory")
    .select()
    .eq("author_id", session.userId)
    .limit(limit)
    .range(offset, offset + limit - 1);

    if (error) {
        if (error.code.includes("116"))
            return [];
        
        throw error;
    }

    return data;
}

async function getItem(
    session: UserAuthContext,
    id: string
): Promise<Tables<"inventory">> {
    const { data, error } = await session.supabase
    .from("inventory")
    .select()
    .eq("id", +id)
    .eq("author_id", session.userId)
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
    session: UserAuthContext,
    item: string,
    category: string,
    amount?: string,
    amount_unit?: string,
    color?: string,
    color_hex?: string,
    cost?: string,
    cost_unit?: string
): Promise<TablesInsert<"inventory">> {
    const { data, error } = await session.supabase
    .from("inventory")
    .insert({ 
        item, 
        amount: amount ? +amount : 1,
        amount_unit: amount_unit || "g",
        category: handleInventoryCategory(category, item), 
        color: color ? color : color_hex ? handleHexCodeConversion(color_hex) : "Unknown", 
        color_hex,
        cost: cost ? +cost : null,
        cost_unit,
        author_id: session.userId 
    })
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

async function editItem(
    session: UserAuthContext,
    id: string,
    item: string,
    category: string,
    amount?: string,
    amount_unit?: string,
    color?: string,
    color_hex?: string,
    cost?: string,
    cost_unit?: string
): Promise<TablesUpdate<"inventory">> {
    const { data, error } = await session.supabase
    .from("inventory")
    .update({ 
        item, 
        amount: amount ? +amount : 1,
        amount_unit: amount_unit || "g",
        category: handleInventoryCategory(category, item), 
        color: color ? color : color_hex ? handleHexCodeConversion(color_hex) : "Unknown", 
        color_hex,
        cost: cost ? +cost : null,
        cost_unit
    })
    .eq("id", +id)
    .eq("author_id", session.userId)
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

async function deleteItem(
    session: UserAuthContext,
    id: string
): Promise<void> {
    const { error } = await session.supabase
    .from("inventory")
    .delete()
    .eq("id", +id)
    .eq("author_id", session.userId)
    .select()
    .single();

    if (error)
        throw error;
}