import { inventory } from '../../db/schema';

export type InventoryItem = typeof inventory.$inferSelect;

export type GetAllItemsParams = {
    userId: string;
    offset: number;
    limit: number;
};

export type GetItemParams = Pick<GetAllItemsParams, 'userId'> & {
    id: string;
};

type InventoryWriteParams = {
    userId: string;
    item: string;
    category: string;
    amount?: string;
    amountUnit?: string;
    color?: string;
    colorHex?: string;
    cost?: string;
    costUnit?: string;
};

export type CreateItemParams = InventoryWriteParams;
export type EditItemParams = InventoryWriteParams & { id: string };
export type DeleteItemParams = GetItemParams;
