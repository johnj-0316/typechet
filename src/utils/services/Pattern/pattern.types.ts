type PatternGetRouteParams = {
    id?: string | void
};

type PatternGetQueryParams = {
    offset?: string,
    limit?: string
};

type PatternPostBodyParams = {
    title: string,
    rows: string[],
    is_editing: boolean
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