import { Tables, TablesInsert, TablesUpdate } from "../../db/database.types";
import { handleInventoryCategory } from "../tools/handleInventoryCategory";
import { handleHexCodeConversion } from "../tools/handleHexCodeConversion";
import { UserAuthContext } from "../controllers/User/users.types";

export { getAllMaterials, getMaterial, createMaterial, editMaterial, deleteMaterial };

async function getAllMaterials(
    session: UserAuthContext,
    pattern_id: string,
    offset: number,
    limit: number
): Promise<Tables<"materials">[]> {
    const { data, error } = await session.supabase
    .from("materials")
    .select()
    .eq("pattern_id", +pattern_id)
    .limit(limit)
    .range(offset, offset + limit - 1);

    if (error) {
        if (error.code.includes("116"))
            return [];
        
        throw error;
    }

    return data;
}

async function getMaterial(
    session: UserAuthContext,
    id: string,
    pattern_id: string
): Promise<Tables<"materials">> {
    const { data, error } = await session.supabase
    .from("materials")
    .select()
    .eq("id", +id)
    .eq("pattern_id", +pattern_id)
    .single();

    if (error)
        throw error;

    return data;
}

// amount will default to 1
// color should be hex
// cost can be null
async function createMaterial(
    session: UserAuthContext,
    pattern_id: string,
    item: string,
    category: string,
    amount?: string,
    amount_unit?: string,
    color?: string,
    color_hex?: string,
    cost?: string,
    cost_unit?: string
): Promise<TablesInsert<"materials">> {
    const { data, error } = await session.supabase
    .from("materials")
    .insert({ 
        item, 
        amount: amount ? +amount : 1,
        amount_unit: amount_unit || "g",
        category: handleInventoryCategory(category, item), 
        color: color ? color : color_hex ? handleHexCodeConversion(color_hex) : "Unknown", 
        color_hex,
        cost: cost ? +cost : null,
        cost_unit,
        pattern_id: +pattern_id
    })
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

async function editMaterial(
    session: UserAuthContext,
    id: string,
    pattern_id: string,
    item: string,
    category: string,
    amount?: string,
    amount_unit?: string,
    color?: string,
    color_hex?: string,
    cost?: string,
    cost_unit?: string
): Promise<TablesUpdate<"materials">> {
    const { data, error } = await session.supabase
    .from("materials")
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
    .eq("pattern_id", +pattern_id)
    .select()
    .single();

    if (error)
        throw error;

    return data;
}

async function deleteMaterial(
    session: UserAuthContext,
    id: string,
    pattern_id: string
): Promise<void> {
    const { error } = await session.supabase
    .from("materials")
    .delete()
    .eq("id", +id)
    .eq("pattern_id", +pattern_id)
    .select()
    .single();

    if (error)
        throw error;
}