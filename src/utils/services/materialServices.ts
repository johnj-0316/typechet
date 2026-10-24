import { and, eq, getTableColumns, inArray } from 'drizzle-orm';

import { db } from '../../db';
import { materials, owners, patterns } from '../../db/schema';
import { APIError } from '../errors/Error';
import { handleInventoryCategory } from '../tools/handleInventoryCategory';
import { handleHexCodeConversion } from '../tools/handleHexCodeConversion';

export { getAllMaterials, getMaterial, createMaterial, editMaterial, deleteMaterial };

type Material = typeof materials.$inferSelect;

function authoredPatternIds(userId: string) {
    return db.select({ id: patterns.id }).from(patterns).where(eq(patterns.authorId, userId));
}

async function getAllMaterials(
    userId: string,
    patternId: string,
    offset: number,
    limit: number,
): Promise<Material[]> {
    return db
        .select(getTableColumns(materials))
        .from(materials)
        .innerJoin(owners, eq(owners.patternId, materials.patternId))
        .where(and(eq(owners.userId, userId), eq(materials.patternId, +patternId)))
        .limit(limit)
        .offset(offset);
}

async function getMaterial(userId: string, id: string, patternId: string): Promise<Material> {
    const [material] = await db
        .select(getTableColumns(materials))
        .from(materials)
        .innerJoin(owners, eq(owners.patternId, materials.patternId))
        .where(
            and(
                eq(owners.userId, userId),
                eq(materials.id, +id),
                eq(materials.patternId, +patternId),
            ),
        )
        .limit(1);

    if (!material) throw new APIError('Material was not found!', 404);

    return material;
}

async function createMaterial(
    userId: string,
    patternId: string,
    item: string,
    category: string,
    amount?: string,
    amountUnit?: string,
    color?: string,
    colorHex?: string,
    cost?: string,
    costUnit?: string,
): Promise<Material> {
    return db.transaction(async (tx) => {
        const [pattern] = await tx
            .select({ id: patterns.id })
            .from(patterns)
            .where(and(eq(patterns.id, +patternId), eq(patterns.authorId, userId)))
            .limit(1);

        if (!pattern) throw new APIError('Pattern was not found!', 404);

        const [material] = await tx
            .insert(materials)
            .values({
                item,
                amount: amount ? +amount : 1,
                amountUnit: amountUnit || 'g',
                category: handleInventoryCategory(category, item),
                color: color || (colorHex ? handleHexCodeConversion(colorHex) : 'Unknown'),
                colorHex,
                cost: cost ? +cost : null,
                costUnit,
                patternId: pattern.id,
            })
            .returning();

        return material;
    });
}

async function editMaterial(
    userId: string,
    id: string,
    patternId: string,
    item: string,
    category: string,
    amount?: string,
    amountUnit?: string,
    color?: string,
    colorHex?: string,
    cost?: string,
    costUnit?: string,
): Promise<Material> {
    const [material] = await db
        .update(materials)
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
        .where(
            and(
                eq(materials.id, +id),
                eq(materials.patternId, +patternId),
                inArray(materials.patternId, authoredPatternIds(userId)),
            ),
        )
        .returning();

    if (!material) throw new APIError('Material was not found!', 404);

    return material;
}

async function deleteMaterial(userId: string, id: string, patternId: string): Promise<void> {
    const [material] = await db
        .delete(materials)
        .where(
            and(
                eq(materials.id, +id),
                eq(materials.patternId, +patternId),
                inArray(materials.patternId, authoredPatternIds(userId)),
            ),
        )
        .returning({ id: materials.id });

    if (!material) throw new APIError('Material was not found!', 404);
}
