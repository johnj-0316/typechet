type StitchesGetRouteParams = {
    id?: string
};

type StitchesGetQueryParams = {
    page?: string,
    limit?: string
};

type StitchesPostBodyParams = {
    shorthand: string,
    name: string,
    origin?: string
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
