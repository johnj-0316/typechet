import { patterns, trackers } from '../../../db/schema';

type TrackersGetRouteParams = {
    id?: string;
};

type TrackersGetQueryParams = {
    offset?: string;
    limit?: string;
};

type TrackersPostBodyParams = {
    pattern_id: string;
    title?: string;
    current_row: string;
    current_stitch?: string;
    current_index: string;
};

type TrackersPutRouteParams = {
    id: string;
};

type TrackersPutBodyParams = Omit<TrackersPostBodyParams, 'pattern_id'>;

type TrackersDeleteRouteParams = TrackersPutRouteParams;

type TrackerWithPatternRows = typeof trackers.$inferSelect &
    Pick<typeof patterns.$inferSelect, 'rows'> & {
        patternTitle: (typeof patterns.$inferSelect)['title'];
    };

export type {
    TrackersGetRouteParams,
    TrackersGetQueryParams,
    TrackersPostBodyParams,
    TrackersPutRouteParams,
    TrackersPutBodyParams,
    TrackersDeleteRouteParams,
    TrackerWithPatternRows,
};
