type MaterialsGetRouteParams = {
    pattern_id_material_id: string
};

type MaterialsGetQueryParams = {
    page?: string,
    limit?: string
};

type MaterialsPostBodyParams = {
    pattern_id: string,
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

type MaterialsPutRouteParams = {
    id: string
};

type MaterialsPutBodyParams = {
    pattern_id: string,
    item: string,
    category: string,
    amount?: string,
    amount_unit?: string,
    color?: string,
    color_hex?: string,
    cost?: string,
    cost_unit?: string
};

type MaterialsDeleteRouteParams = MaterialsGetRouteParams;

export type { 
    MaterialsGetRouteParams, 
    MaterialsGetQueryParams, 
    MaterialsPostBodyParams, 
    MaterialsPutRouteParams, 
    MaterialsPutBodyParams, 
    MaterialsDeleteRouteParams 
};