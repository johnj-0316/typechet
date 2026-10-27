import { and, eq, ilike, or, sql } from 'drizzle-orm';
import { unionAll } from 'drizzle-orm/pg-core';

import { db } from '../../db';
import { owners, patterns, stitches, trackers } from '../../db/schema';
import { SearchResult, SearchUserDataParams } from './searchServices.types';

export type { SearchResult } from './searchServices.types';

export async function searchUserData({
    userId,
    searchTerm,
    limit,
}: SearchUserDataParams): Promise<SearchResult[]> {
    const query = `%${escapeLikePattern(searchTerm.trim())}%`;

    const patternSearch = db
        .select({
            type: sql<SearchResult['type']>`'pattern'`.as('type'),
            id: sql<string>`${patterns.id}::text`.as('id'),
            title: patterns.title,
            subtitle: patterns.description,
            updatedAt: patterns.updatedAt,
        })
        .from(owners)
        .innerJoin(patterns, eq(patterns.id, owners.patternId))
        .where(
            and(
                eq(owners.userId, userId),
                or(ilike(patterns.title, query), ilike(patterns.description, query)),
            ),
        );

    const trackerSearch = db
        .select({
            type: sql<SearchResult['type']>`'tracker'`.as('type'),
            id: sql<string>`${trackers.id}::text`.as('id'),
            title: sql<string>`coalesce(${trackers.title}, 'My Tracker')`.as('title'),
            subtitle: sql<string | null>`${patterns.title}`.as('subtitle'),
            updatedAt: trackers.updatedAt,
        })
        .from(trackers)
        .innerJoin(patterns, eq(patterns.id, trackers.patternId))
        .where(
            and(
                eq(trackers.userId, userId),
                or(
                    ilike(trackers.title, query),
                    ilike(trackers.currentStitch, query),
                    ilike(patterns.title, query),
                ),
            ),
        );

    const stitchSearch = db
        .select({
            type: sql<SearchResult['type']>`'stitch'`.as('type'),
            id: sql<string>`${stitches.id}::text`.as('id'),
            title: stitches.name,
            subtitle: sql<string | null>`${stitches.shorthand}`.as('subtitle'),
            updatedAt: stitches.updatedAt,
        })
        .from(stitches)
        .where(
            and(
                or(eq(stitches.custom, false), eq(stitches.authorId, userId)),
                or(
                    ilike(stitches.name, query),
                    ilike(stitches.shorthand, query),
                    ilike(stitches.origin, query),
                ),
            ),
        );

    return unionAll(patternSearch, trackerSearch, stitchSearch)
        .orderBy(sql`5 desc`)
        .limit(limit);
}

function escapeLikePattern(value: string): string {
    return value.replace(/[\\%_]/g, '\\$&');
}
