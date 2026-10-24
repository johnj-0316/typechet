import { and, eq, getTableColumns } from 'drizzle-orm';

import { db } from '../../db';
import { owners, patterns, trackers } from '../../db/schema';
import { APIError } from '../errors/Error';

export { getUserTrackers, getUserTracker, createTracker, editTracker, deleteTracker };
export type { TrackerWithPatternRows };

type Tracker = typeof trackers.$inferSelect;
type TrackerWithPatternRows = Tracker & {
    rows: (typeof patterns.$inferSelect)['rows'];
    patternTitle: (typeof patterns.$inferSelect)['title'];
};

const trackerSelection = {
    ...getTableColumns(trackers),
    rows: patterns.rows,
    patternTitle: patterns.title,
};

async function getUserTrackers(
    userId: string,
    offset: number,
    limit: number,
): Promise<TrackerWithPatternRows[]> {
    return db
        .select(trackerSelection)
        .from(trackers)
        .innerJoin(patterns, eq(patterns.id, trackers.patternId))
        .where(eq(trackers.userId, userId))
        .limit(limit)
        .offset(offset);
}

async function getUserTracker(userId: string, id: string): Promise<TrackerWithPatternRows> {
    const [tracker] = await db
        .select(trackerSelection)
        .from(trackers)
        .innerJoin(patterns, eq(patterns.id, trackers.patternId))
        .where(and(eq(trackers.id, id), eq(trackers.userId, userId)))
        .limit(1);

    if (!tracker) throw new APIError('Tracker was not found!', 404);

    return tracker;
}

async function createTracker(
    userId: string,
    patternId: string,
    currentRow: string,
    currentIndex: string,
    title?: string,
    currentStitch?: string,
): Promise<Tracker> {
    return db.transaction(async (tx) => {
        const [owner] = await tx
            .select({ userId: owners.userId })
            .from(owners)
            .where(and(eq(owners.userId, userId), eq(owners.patternId, +patternId)))
            .limit(1);

        if (!owner) throw new APIError('Pattern was not found!', 404);

        const [tracker] = await tx
            .insert(trackers)
            .values({
                currentStitch,
                currentRow: +currentRow || 0,
                currentIndex: +currentIndex || 0,
                title: title || 'My Tracker',
                userId,
                patternId: +patternId,
            })
            .returning();

        return tracker;
    });
}

async function editTracker(
    userId: string,
    id: string,
    currentRow: string,
    currentIndex: string,
    title?: string,
    currentStitch?: string,
): Promise<Tracker> {
    const [tracker] = await db
        .update(trackers)
        .set({
            currentStitch,
            currentRow: +currentRow || 0,
            currentIndex: +currentIndex || 0,
            title: title || 'My Tracker',
        })
        .where(and(eq(trackers.userId, userId), eq(trackers.id, id)))
        .returning();

    if (!tracker) throw new APIError('Tracker was not found!', 404);

    return tracker;
}

async function deleteTracker(userId: string, id: string): Promise<void> {
    const [tracker] = await db
        .delete(trackers)
        .where(and(eq(trackers.id, id), eq(trackers.userId, userId)))
        .returning({ id: trackers.id });

    if (!tracker) throw new APIError('Tracker was not found!', 404);
}
