import { and, eq } from 'drizzle-orm';

import { db } from '../../db';
import { inventory } from '../../db/schema';
import { APIError } from '../errors/Error';
import { handleInventoryCategory } from '../tools/handleInventoryCategory';
import { handleHexCodeConversion } from '../tools/handleHexCodeConversion';

export { getAllItems, getItem, createItem, editItem, deleteItem };

type InventoryItem = typeof inventory.$inferSelect;

async function getAllItems(
    userId: string,
    offset: number,
    limit: number,
): Promise<InventoryItem[]> {
    return db
        .select()
        .from(inventory)
        .where(eq(inventory.authorId, userId))
        .limit(limit)
        .offset(offset);
}

async function getItem(userId: string, id: string): Promise<InventoryItem> {
    const [item] = await db
        .select()
        .from(inventory)
        .where(and(eq(inventory.id, +id), eq(inventory.authorId, userId)))
        .limit(1);

    if (!item) throw new APIError('Inventory item was not found!', 404);

    return item;
}

async function createItem(
    userId: string,
    item: string,
    category: string,
    amount?: string,
    amountUnit?: string,
    color?: string,
    colorHex?: string,
    cost?: string,
    costUnit?: string,
): Promise<InventoryItem> {
    const [createdItem] = await db
        .insert(inventory)
        .values({
            item,
            amount: amount ? +amount : 1,
            amountUnit: amountUnit || 'g',
            category: handleInventoryCategory(category, item),
            color: color || (colorHex ? handleHexCodeConversion(colorHex) : 'Unknown'),
            colorHex,
            cost: cost ? +cost : null,
            costUnit,
            authorId: userId,
        })
        .returning();

    return createdItem;
}

async function editItem(
    userId: string,
    id: string,
    item: string,
    category: string,
    amount?: string,
    amountUnit?: string,
    color?: string,
    colorHex?: string,
    cost?: string,
    costUnit?: string,
): Promise<InventoryItem> {
    const [updatedItem] = await db
        .update(inventory)
        .set({
            item,
            amount: amount ? +amount : 1,
            amountUnit: amountUnit || 'g',
            category: handleInventoryCategory(category, item),
            color: color || (colorHex ? handleHexCodeConversion(colorHex) : 'Unknown'),
            colorHex,
            cost: cost ? +cost : null,
            costUnit,
        })
        .where(and(eq(inventory.id, +id), eq(inventory.authorId, userId)))
        .returning();

    if (!updatedItem) throw new APIError('Inventory item was not found!', 404);

    return updatedItem;
}

async function deleteItem(userId: string, id: string): Promise<void> {
    const [deletedItem] = await db
        .delete(inventory)
        .where(and(eq(inventory.id, +id), eq(inventory.authorId, userId)))
        .returning({ id: inventory.id });

    if (!deletedItem) throw new APIError('Inventory item was not found!', 404);
}
