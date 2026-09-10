type TrackersGetRouteParams = {
    id?: string
};

type TrackersGetQueryParams = {
    page?: string,
    limit?: string
};

type TrackersPostBodyParams = {
    pattern_id: string,
    title?: string,
    current_row: string,
    current_stitch?: string,
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