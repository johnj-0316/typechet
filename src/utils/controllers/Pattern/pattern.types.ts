type PatternGetRouteParams = {
    id?: string | void
};

type PatternGetQueryParams = {
    page?: string,
    limit?: string
};

type PatternPostBodyParams = {
    title: string,
    rows: string[],
    is_editing: string
};

type PatternDeleteRouteParams = {
    id: string
};

type PatternPutRouteParams = {
    id: string
};

type PatternPutBodyParams = PatternPostBodyParams;

export type { 
    PatternGetRouteParams, 
    PatternGetQueryParams, 
    PatternPostBodyParams,
    PatternPutRouteParams,
    PatternPutBodyParams,
    PatternDeleteRouteParams 
};