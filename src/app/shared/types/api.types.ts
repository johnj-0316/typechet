import { inventory, patterns, stitches, trackers, userProfiles } from '../../../db/schema';

type ApiDataResponse<T> = {
    message: string;
    data: T;
};

type ApiUserResponse<T> = {
    message: string;
    user: T;
};

type Inventory = typeof inventory.$inferSelect;

type Pattern = typeof patterns.$inferSelect;

type Profile = typeof userProfiles.$inferSelect;

type Stitches = typeof stitches.$inferSelect;

type Trackers = typeof trackers.$inferSelect &
    Pick<typeof patterns.$inferSelect, 'rows'> & {
        patternTitle: (typeof patterns.$inferSelect)['title'];
    };

export type { ApiDataResponse, ApiUserResponse, Inventory, Pattern, Profile, Stitches, Trackers };
