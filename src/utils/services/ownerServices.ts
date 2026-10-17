import { and, asc, eq, inArray, ne } from "drizzle-orm";

import { db } from "../../db";
import { owners, patterns } from "../../db/schema";
import { APIError } from "../errors/Error";
import { handleOwnerEndpoint } from "../tools/handleOwnerEndpoint";

export { getAllOwners, getOwnerByPattern, postOwner, editOwner, deleteOwner };

type Owner = typeof owners.$inferSelect;
type OwnerId = Pick<Owner, "userId">;

async function getAllOwners(
    userId: string,
    offset: number,
    limit: number
): Promise<OwnerId[]> {
    return db
    .select({ userId: owners.userId })
    .from(owners)
    .innerJoin(patterns, eq(patterns.id, owners.patternId))
    .where(eq(patterns.authorId, userId))
    .orderBy(asc(owners.userId))
    .limit(limit)
    .offset(offset);
}

async function getOwnerByPattern(
    userId: string,
    patternId: string,
    offset: number,
    limit: number
): Promise<OwnerId[]> {
    return db
    .select({ userId: owners.userId })
    .from(owners)
    .innerJoin(patterns, eq(patterns.id, owners.patternId))
    .where(and(
        eq(patterns.authorId, userId),
        eq(patterns.id, +patternId)
    ))
    .limit(limit)
    .offset(offset);
}

async function postOwner(
    authenticatedUserId: string,
    patternId: string,
    userId: string,
    message?: string | null
): Promise<Owner> {
    return db.transaction(async (tx) => {
        const [pattern] = await tx
        .select({ id: patterns.id })
        .from(patterns)
        .where(and(
            eq(patterns.id, +patternId),
            eq(patterns.authorId, authenticatedUserId)
        ))
        .limit(1);

        if (!pattern)
            throw new APIError("Pattern was not found!", 404);

        const [owner] = await tx
        .insert(owners)
        .values({
            patternId: pattern.id,
            userId,
            message: message || null
        })
        .returning();

        return owner;
    });
}

async function editOwner(
    authenticatedUserId: string,
    compositeEndpoint: string,
    patternId: string,
    userId: string,
    message?: string | null
): Promise<Owner> {
    const [existingUserId, existingPatternId] = handleOwnerEndpoint(compositeEndpoint);

    if (existingUserId === authenticatedUserId || userId === authenticatedUserId)
        throw new APIError("The pattern author's ownership cannot be edited.", 403);

    return db.transaction(async (tx) => {
        const authorizedPatterns = await tx
        .select({ id: patterns.id })
        .from(patterns)
        .where(and(
            eq(patterns.authorId, authenticatedUserId),
            eq(patterns.id, +patternId)
        ))
        .limit(1);

        if (!authorizedPatterns.length)
            throw new APIError("Pattern was not found!", 404);

        const [owner] = await tx
        .update(owners)
        .set({
            userId,
            patternId: +patternId,
            message: message || null
        })
        .where(and(
            eq(owners.userId, existingUserId),
            eq(owners.patternId, +existingPatternId),
            ne(owners.userId, authenticatedUserId),
            inArray(
                owners.patternId,
                tx.select({ id: patterns.id })
                    .from(patterns)
                    .where(eq(patterns.authorId, authenticatedUserId))
            )
        ))
        .returning();

        if (!owner)
            throw new APIError("Owner was not found!", 404);

        return owner;
    });
}

async function deleteOwner(
    authenticatedUserId: string,
    compositeEndpoint: string
): Promise<void> {
    const [userId, patternId] = handleOwnerEndpoint(compositeEndpoint);

    const [owner] = await db
    .delete(owners)
    .where(and(
        eq(owners.userId, userId),
        eq(owners.patternId, +patternId),
        ne(owners.userId, authenticatedUserId),
        inArray(
            owners.patternId,
            db.select({ id: patterns.id })
                .from(patterns)
                .where(and(
                    eq(patterns.id, +patternId),
                    eq(patterns.authorId, authenticatedUserId)
                ))
        )
    ))
    .returning({ userId: owners.userId });

    if (!owner)
        throw new APIError("Owner was not found!", 404);
}
