import { Tables } from '../../../db/database.types';

type TrackersGetRouteParams = {
    id?: string
};

type TrackersGetQueryParams = {
    offset?: string,
    limit?: string
};

type TrackersPostBodyParams = {
    pattern_id: string,
    title?: string,
    current_row: string,
    current_stitch?: string,
    current_index: string,
    is_finished: boolean
};

type TrackersPutRouteParams = {
    id: string
};

type TrackersPutBodyParams = Omit<TrackersPostBodyParams, "pattern_id">;

type TrackersDeleteRouteParams = TrackersPutRouteParams;

type TrackerWithPatternRows = Tables<'trackers'> & Pick<Tables<'patterns'>, 'rows' | 'title'>;

export type {
    TrackersGetRouteParams,
    TrackersGetQueryParams,
    TrackersPostBodyParams,
    TrackersPutRouteParams,
    TrackersPutBodyParams,
    TrackersDeleteRouteParams,
    TrackerWithPatternRows
};