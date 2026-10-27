import { patterns } from '../../db/schema';

export type Pattern = typeof patterns.$inferSelect;

export type GetAllPatternsParams = {
    userId: string;
    offset: number;
    limit: number;
};

export type GetPatternParams = Pick<GetAllPatternsParams, 'userId'> & {
    id: string;
};

type PatternWriteParams = {
    userId: string;
    title: string;
    rows: string[];
    isEditing: boolean;
    description?: string;
};

export type CreatePatternParams = PatternWriteParams;
export type EditPatternParams = PatternWriteParams & { id: string };
export type DeletePatternParams = GetPatternParams;

export type EnforceDraftLimitParams = {
    userId: string;
    excludedPatternId?: number;
};
