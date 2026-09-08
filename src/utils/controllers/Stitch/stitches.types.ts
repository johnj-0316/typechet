type StitchesGetRouteParams = {
    id: string | void
};

type StitchesGetQueryParams = {
    page: string | void,
    limit: string | void
};

type StitchesPostBodyParams = {
    shorthand: string,
    name: string,
    origin: string | void
};

type StitchesPutRouteParams = {
    id: string
};

type StitchesPutBodyParams = StitchesPostBodyParams;

type StitchesDeleteRouteParams = StitchesPutRouteParams;

export type {
    StitchesGetRouteParams,
    StitchesGetQueryParams,
    StitchesPostBodyParams,
    StitchesPutRouteParams,
    StitchesPutBodyParams,
    StitchesDeleteRouteParams
}
