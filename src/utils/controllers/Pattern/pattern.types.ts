type Pair = Record<string, string>;

type PatternRouteParams = {
    id: string | void
};

type PatternQueryParams = {
    page: string | void,
    limit: string | void
};


export type { Pair, PatternRouteParams, PatternQueryParams };