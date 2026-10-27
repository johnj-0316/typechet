import { and, eq } from 'drizzle-orm';

import { db } from '../../db';
import { inventory } from '../../db/schema';
import { APIError } from '../errors/Error';
import { handleInventoryCategory } from '../tools/handleInventoryCategory';
import { handleHexCodeConversion } from '../tools/handleHexCodeConversion';
import {
    CreateItemParams,
    DeleteItemParams,
    EditItemParams,
    GetAllItemsParams,
    GetItemParams,
    InventoryItem,
} from './inventoryServices.types';

export { getAllItems, getItem, createItem, editItem, deleteItem };

async function getAllItems({ userId, offset, limit }: GetAllItemsParams): Promise<InventoryItem[]> {
    return db
        .select()
        .from(inventory)
        .where(eq(inventory.authorId, userId))
        .limit(limit)
        .offset(offset);
}

async function getItem({ userId, id }: GetItemParams): Promise<InventoryItem> {
    const [item] = await db
        .select()
        .from(inventory)
        .where(and(eq(inventory.id, +id), eq(inventory.authorId, userId)))
        .limit(1);

    if (!item) throw new APIError('Inventory item was not found!', 404);

    return item;
}

async function createItem({
    userId,
    item,
    category,
    amount,
    amountUnit,
    color,
    colorHex,
    cost,
    costUnit,
}: CreateItemParams): Promise<InventoryItem> {
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

async function editItem({
    userId,
    id,
    item,
    category,
    amount,
    amountUnit,
    color,
    colorHex,
    cost,
    costUnit,
}: EditItemParams): Promise<InventoryItem> {
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

async function deleteItem({ userId, id }: DeleteItemParams): Promise<void> {
    const [deletedItem] = await db
        .delete(inventory)
        .where(and(eq(inventory.id, +id), eq(inventory.authorId, userId)))
        .returning({ id: inventory.id });

    if (!deletedItem) throw new APIError('Inventory item was not found!', 404);
}
