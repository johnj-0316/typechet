import { materials } from '../../db/schema';

export type Material = typeof materials.$inferSelect;

export type GetAllMaterialsParams = {
    userId: string;
    patternId: string;
    offset: number;
    limit: number;
};

export type GetMaterialParams = Pick<GetAllMaterialsParams, 'userId' | 'patternId'> & {
    id: string;
};

type MaterialWriteParams = {
    userId: string;
    patternId: string;
    item: string;
    category: string;
    amount?: string;
    amountUnit?: string;
    color?: string;
    colorHex?: string;
    cost?: string;
    costUnit?: string;
};

export type CreateMaterialParams = MaterialWriteParams;
export type EditMaterialParams = MaterialWriteParams & { id: string };
export type DeleteMaterialParams = GetMaterialParams;
