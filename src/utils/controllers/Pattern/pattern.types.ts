type PatternGetRouteParams = {
    id?: string | void
};

type PatternPostBodyParams = {
    title: string,
    rows: string[],
    is_editing: string
};

type PatternDeleteRouteParams = {
    id: string
};

type PatternGetQueryParams = {
    page?: string,
    limit?: string
};

export type { 
    PatternGetRouteParams, 
    PatternGetQueryParams, 
    PatternPostBodyParams,
    PatternDeleteRouteParams 
};