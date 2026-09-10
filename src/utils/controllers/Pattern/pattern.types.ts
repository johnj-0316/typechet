type Pair = Record<string, string>;

type PatternGetRouteParams = {
    id: string | void
};

type PatternPostBodyParams = {
    title: string,
    rows: string[], 
    colors: Pair, 
    sizes: Pair, 
    materials: string[]
};

type PatternDeleteRouteParams = {
    id: string
};

type PatternGetQueryParams = {
    page: string | void,
    limit: string | void
};


export type { 
    Pair, 
    PatternGetRouteParams, 
    PatternGetQueryParams, 
    PatternPostBodyParams,
    PatternDeleteRouteParams 
};