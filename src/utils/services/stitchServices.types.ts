import { stitches } from '../../db/schema';

export type Stitch = typeof stitches.$inferSelect;

export type GetUserStitchesParams = {
    userId: string;
    offset: number;
    limit: number;
};

export type GetUserStitchParams = Pick<GetUserStitchesParams, 'userId'> & {
    id: string;
};

type StitchWriteParams = {
    userId: string;
    shorthand: string;
    name: string;
    origin?: string;
};

export type CreateStitchParams = StitchWriteParams;
export type EditStitchParams = StitchWriteParams & { id: string };
export type DeleteStitchParams = GetUserStitchParams;
