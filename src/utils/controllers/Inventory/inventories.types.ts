type InventoryGetRouteParams = {
    id?: string
};

type InventoryGetQueryParams = {
    page?: string,
    limit?: string
};

type InventoryPostBodyParams = {
    item: string,
    amount: string,
    amount_unit: string,
    category: string,
    color?: string,
    cost?: string
};

type InventoryPutRouteParams = {
    id: string
};

type InventoryPutBodyParams = InventoryPostBodyParams;

type InventoryDeleteRouteParams = InventoryPutRouteParams;

export type { 
    InventoryGetRouteParams, 
    InventoryGetQueryParams, 
    InventoryPostBodyParams, 
    InventoryPutRouteParams, 
    InventoryPutBodyParams, 
    InventoryDeleteRouteParams 
};