import { and, count, eq, getTableColumns, ne } from 'drizzle-orm';

import { db } from '../../db';
import { owners, patterns } from '../../db/schema';
import { APIError } from '../errors/Error';
import {
    CreatePatternParams,
    DeletePatternParams,
    EditPatternParams,
    EnforceDraftLimitParams,
    GetAllPatternsParams,
    GetPatternParams,
    Pattern,
} from './patternServices.types';

export { getAllPatterns, getPattern, createPattern, editPattern, deletePattern };

const MAX_DRAFTS = 9;

async function enforceDraftLimit({
    userId,
    excludedPatternId,
}: EnforceDraftLimitParams): Promise<void> {
    const conditions = [eq(patterns.authorId, userId), eq(patterns.isEditing, true)];

    // defined to exclude the pattern currently being edited and turned into isEditing
    // if 9 drafts and editing 1 of them, limit should exclude the edited one
    if (excludedPatternId !== undefined) conditions.push(ne(patterns.id, excludedPatternId));

    const [{ draftCount }] = await db
        .select({ draftCount: count() })
        .from(patterns)
        .where(and(...conditions));

    if (draftCount >= MAX_DRAFTS)
        throw new APIError(`A user cannot have more than ${MAX_DRAFTS} drafts.`, 403);
}

// Returns patterns available to the user through the owners table.
async function getAllPatterns({ userId, offset, limit }: GetAllPatternsParams): Promise<Pattern[]> {
    return db
        .select(getTableColumns(patterns))
        .from(owners)
        .innerJoin(patterns, eq(owners.patternId, patterns.id))
        .where(eq(owners.userId, userId))
        .limit(limit)
        .offset(offset);
}

// Returns one pattern only when it is available to the authenticated user.
async function getPattern({ userId, id }: GetPatternParams): Promise<Pattern> {
    const [pattern] = await db
        .select(getTableColumns(patterns))
        .from(owners)
        .innerJoin(patterns, eq(owners.patternId, patterns.id))
        .where(and(eq(owners.userId, userId), eq(owners.patternId, +id)))
        .limit(1);

    if (!pattern) throw new APIError('Pattern was not found!', 404);

    return pattern;
}

async function createPattern({
    userId,
    title,
    rows,
    isEditing,
    description,
}: CreatePatternParams): Promise<Pattern> {
    return db.transaction(async (tx) => {
        if (isEditing) await enforceDraftLimit({ userId });

        const [pattern] = await tx
            .insert(patterns)
            .values({
                title: title || 'Untitled Pattern',
                rows,
                isEditing,
                authorId: userId,
                description,
            })
            .returning();

        const [owner] = await tx
            .insert(owners)
            .values({
                userId: userId,
                patternId: pattern.id,
            })
            .returning();

        return pattern;
    });
}

async function editPattern({
    userId,
    id,
    title,
    rows,
    isEditing,
    description,
}: EditPatternParams): Promise<Pattern> {
    if (isEditing) await enforceDraftLimit({ userId, excludedPatternId: +id });

    const [pattern] = await db
        .update(patterns)
        .set({
            title: title || 'Untitled Pattern',
            rows,
            isEditing,
            description,
        })
        .where(and(eq(patterns.authorId, userId), eq(patterns.id, +id)))
        .returning();

    if (!pattern) throw new APIError('Pattern was not found!', 404);

    return pattern;
}

async function deletePattern({ userId, id }: DeletePatternParams): Promise<void> {
    const [pattern] = await db
        .delete(patterns)
        .where(and(eq(patterns.authorId, userId), eq(patterns.id, +id)))
        .returning({ id: patterns.id });

    if (!pattern) throw new APIError('Pattern was not found!', 404);
}
