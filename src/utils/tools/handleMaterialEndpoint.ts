// delimeter will be comma
// structure should be
// pattern_id,material_id
export function handleMaterialEndpoint(compositeEndpoint: string) {
    if (typeof compositeEndpoint !== "string")
        throw new Error("path parameter is not a string.");

    if (!compositeEndpoint.length)
        throw new Error("path parameter is empty.")

    const params = compositeEndpoint.split(",").map(param => param.trim());

    if (params.some(param => !param.length || isNaN(+param)))
        throw new Error("path parameter values are not valid.");
    
    return params;
}