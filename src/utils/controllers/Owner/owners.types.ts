type OwnerGetRouteParams = {
    pattern_id?: string | void
};

type OwnerGetQueryParams = {
    page?: string,
    limit?: string
};

type OwnerPostBodyParams = {
    pattern_id: string,
    user_id: string,
    message?: string | void
};

type OwnerPutRouteParams = {
    user_pattern_id: string
};

type OwnerPutBodyParams = OwnerPostBodyParams;

type OwnerDeleteRouteParams = OwnerPutRouteParams;

export type { 
    OwnerGetRouteParams, 
    OwnerGetQueryParams, 
    OwnerPostBodyParams, 
    OwnerPutRouteParams, 
    OwnerPutBodyParams, 
    OwnerDeleteRouteParams 
};