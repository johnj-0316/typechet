type Pair = Record<string, string>;

type PatternGetRouteParams = {
    id: string | void
};

type PatternDeleteRouteParams = {
    id: string
};

type PatternGetQueryParams = {
    page: string | void,
    limit: string | void
};


export type { Pair, PatternGetRouteParams, PatternGetQueryParams, PatternDeleteRouteParams };