import { and, eq, getTableColumns } from 'drizzle-orm';

import { db } from '../../db';
import { owners, patterns, trackers } from '../../db/schema';
import { APIError } from '../errors/Error';
import {
    CreateTrackerParams,
    DeleteTrackerParams,
    EditTrackerParams,
    GetUserTrackerParams,
    GetUserTrackersParams,
    Tracker,
    TrackerWithPatternRows,
} from './trackerServices.types';

export { getUserTrackers, getUserTracker, createTracker, editTracker, deleteTracker };
export type { TrackerWithPatternRows } from './trackerServices.types';

const trackerSelection = {
    ...getTableColumns(trackers),
    rows: patterns.rows,
    patternTitle: patterns.title,
};

async function getUserTrackers({
    userId,
    offset,
    limit,
}: GetUserTrackersParams): Promise<TrackerWithPatternRows[]> {
    return db
        .select(trackerSelection)
        .from(trackers)
        .innerJoin(patterns, eq(patterns.id, trackers.patternId))
        .where(eq(trackers.userId, userId))
        .limit(limit)
        .offset(offset);
}

async function getUserTracker({
    userId,
    id,
}: GetUserTrackerParams): Promise<TrackerWithPatternRows> {
    const [tracker] = await db
        .select(trackerSelection)
        .from(trackers)
        .innerJoin(patterns, eq(patterns.id, trackers.patternId))
        .where(and(eq(trackers.id, id), eq(trackers.userId, userId)))
        .limit(1);

    if (!tracker) throw new APIError('Tracker was not found!', 404);

    return tracker;
}

async function createTracker({
    userId,
    patternId,
    currentRow,
    currentIndex,
    title,
    currentStitch,
}: CreateTrackerParams): Promise<Tracker> {
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

async function editTracker({
    userId,
    id,
    currentRow,
    currentIndex,
    title,
    currentStitch,
}: EditTrackerParams): Promise<Tracker> {
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

async function deleteTracker({ userId, id }: DeleteTrackerParams): Promise<void> {
    const [tracker] = await db
        .delete(trackers)
        .where(and(eq(trackers.id, id), eq(trackers.userId, userId)))
        .returning({ id: trackers.id });

    if (!tracker) throw new APIError('Tracker was not found!', 404);
}
