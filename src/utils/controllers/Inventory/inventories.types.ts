type InventoryGetRouteParams = {
    id?: string
};

type InventoryGetQueryParams = {
    page?: string,
    limit?: string
};

type InventoryPostBodyParams = {
    item: string,
    category: string,
    color: string,
    color_hex?: string
} & (
    {
        cost?: string,
        cost_unit?: string
    } |
    {
        cost: string,
        cost_unit: string
    }
) & (
    {
        amount: string,
        amount_unit: string
    } |
    {
        amount?: string,
        amount_unit?: string
    }
)

type InventoryPutRouteParams = {
    id: string
};

type InventoryPutBodyParams = {
    item: string,
    category: string,
    amount?: string,
    amount_unit?: string,
    color?: string,
    color_hex?: string,
    cost?: string,
    cost_unit?: string
};

type InventoryDeleteRouteParams = InventoryPutRouteParams;

export type { 
    InventoryGetRouteParams, 
    InventoryGetQueryParams, 
    InventoryPostBodyParams, 
    InventoryPutRouteParams, 
    InventoryPutBodyParams, 
    InventoryDeleteRouteParams 
};