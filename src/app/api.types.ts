import { Tables } from "../db/database.types";

type ApiDataResponse<T> = {
    message: string;
    data: T;
};

type Inventory = Tables<"inventory">;

type Pattern = Tables<"patterns">;

type Profile = Tables<"user_profile">;

type Stitches = Tables<"stitches">;

type Trackers = Tables<"trackers">;

export type {
    ApiDataResponse,
    Inventory,
    Pattern,
    Profile,
    Stitches,
    Trackers
};
