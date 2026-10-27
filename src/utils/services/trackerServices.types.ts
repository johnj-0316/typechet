import { patterns, trackers } from '../../db/schema';

export type Tracker = typeof trackers.$inferSelect;
export type TrackerWithPatternRows = Tracker & {
    rows: (typeof patterns.$inferSelect)['rows'];
    patternTitle: (typeof patterns.$inferSelect)['title'];
};

export type GetUserTrackersParams = {
    userId: string;
    offset: number;
    limit: number;
};

export type GetUserTrackerParams = Pick<GetUserTrackersParams, 'userId'> & {
    id: string;
};

type TrackerWriteParams = {
    userId: string;
    currentRow: string;
    currentIndex: string;
    title?: string;
    currentStitch?: string;
};

export type CreateTrackerParams = TrackerWriteParams & { patternId: string };
export type EditTrackerParams = TrackerWriteParams & { id: string };
export type DeleteTrackerParams = GetUserTrackerParams;
