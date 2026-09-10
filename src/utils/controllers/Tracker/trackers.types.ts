type TrackersGetRouteParams = {
    id?: string | void
};

type TrackersGetQueryParams = {
    page?: string | void,
    limit?: string | void
};

type TrackersPostBodyParams = {
    pattern_id: string,
    title?: string | void,
    current_row: string,
    current_stitch?: string | void,
    current_index: string,
    is_finished: string
};

type TrackersPutRouteParams = {
    id: string
};

type TrackersPutBodyParams = Omit<TrackersPostBodyParams, "pattern_id">;

type TrackersDeleteRouteParams = TrackersPutRouteParams;

export type {
    TrackersGetRouteParams,
    TrackersGetQueryParams,
    TrackersPostBodyParams,
    TrackersPutRouteParams,
    TrackersPutBodyParams,
    TrackersDeleteRouteParams
};