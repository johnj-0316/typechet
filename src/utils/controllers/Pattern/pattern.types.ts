type Pair = Record<string, string>;

type PatternGetRouteParams = {
    id?: string | void
};

type PatternPostBodyParams = {
    title: string,
    rows: string[]
};

type PatternDeleteRouteParams = {
    id: string
};

type PatternGetQueryParams = {
    page?: string,
    limit?: string
};


export type { 
    Pair, 
    PatternGetRouteParams, 
    PatternGetQueryParams, 
    PatternPostBodyParams,
    PatternDeleteRouteParams 
};