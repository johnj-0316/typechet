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

export type { OwnerGetRouteParams, OwnerGetQueryParams, OwnerPostBodyParams };