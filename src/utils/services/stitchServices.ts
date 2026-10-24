import { and, eq, ne, or } from 'drizzle-orm';

import { db } from '../../db';
import { stitches } from '../../db/schema';
import { APIError } from '../errors/Error';

export { getUserStitches, getUserStitch, createStitch, editStitch, deleteStitch };

type Stitch = typeof stitches.$inferSelect;

async function getUserStitches(userId: string, offset: number, limit: number): Promise<Stitch[]> {
    return db
        .select()
        .from(stitches)
        .where(or(eq(stitches.custom, false), eq(stitches.authorId, userId)))
        .limit(limit)
        .offset(offset);
}

async function getUserStitch(userId: string, id: string): Promise<Stitch> {
    const [stitch] = await db
        .select()
        .from(stitches)
        .where(
            and(
                eq(stitches.id, +id),
                or(eq(stitches.custom, false), eq(stitches.authorId, userId)),
            ),
        )
        .limit(1);

    if (!stitch) throw new APIError('Stitch was not found!', 404);

    return stitch;
}

async function createStitch(
    userId: string,
    shorthand: string,
    name: string,
    origin?: string,
): Promise<Stitch> {
    const [stitch] = await db
        .insert(stitches)
        .values({
            shorthand,
            name,
            origin: origin || 'US',
            authorId: userId,
        })
        .returning();

    return stitch;
}

async function editStitch(
    userId: string,
    id: string,
    shorthand: string,
    name: string,
    origin?: string,
): Promise<Stitch> {
    const [stitch] = await db
        .update(stitches)
        .set({
            shorthand,
            name,
            origin: origin || 'US',
        })
        .where(and(eq(stitches.authorId, userId), eq(stitches.id, +id)))
        .returning();

    if (!stitch) throw new APIError('Stitch was not found!', 404);

    return stitch;
}

async function deleteStitch(userId: string, id: string): Promise<void> {
    const [stitch] = await db
        .delete(stitches)
        .where(and(eq(stitches.authorId, userId), eq(stitches.id, +id), ne(stitches.custom, false)))
        .returning({ id: stitches.id });

    if (!stitch) throw new APIError('Stitch was not found!', 404);
}
