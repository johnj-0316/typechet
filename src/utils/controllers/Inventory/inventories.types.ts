type InventoryGetRouteParams = {
    id: string | void
};

type InventoryGetQueryParams = {
    page: string | void,
    limit: string | void
};

type InventoryPostBodyParams = {
    item: string,
    amount: string | void,
    category: string | void,
    color: string | null,
    cost: string | null
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