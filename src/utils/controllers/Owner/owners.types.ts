type OwnerGetRouteParams = {
    pattern_id: string | void
};

type OwnerGetQueryParams = {
    page: string | void,
    limit: string | void
};

type OwnerPostBodyParams = {
    pattern_id: string,
    user_id: string,
    message?: string
};

type OwnerPutRouteParams = {
    user_pattern_id: string
};

type OwnerPutBodyParams = OwnerPostBodyParams;

export type { OwnerGetRouteParams, OwnerGetQueryParams, OwnerPostBodyParams, OwnerPutRouteParams, OwnerPutBodyParams };