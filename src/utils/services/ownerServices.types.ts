import { owners } from '../../db/schema';

export type Owner = typeof owners.$inferSelect;
export type OwnerId = Pick<Owner, 'userId'>;

export type GetAllOwnersParams = {
    userId: string;
    offset: number;
    limit: number;
};

export type GetOwnerByPatternParams = GetAllOwnersParams & {
    patternId: string;
};

export type PostOwnerParams = {
    authenticatedUserId: string;
    patternId: string;
    userId: string;
    message?: string | null;
};

export type EditOwnerParams = PostOwnerParams & {
    compositeEndpoint: string;
};

export type DeleteOwnerParams = Pick<EditOwnerParams, 'authenticatedUserId' | 'compositeEndpoint'>;
