// delimeter will be comma
// structure should be

import { ClientError } from "../errors/Error";

// pattern_id,material_id
export function handleMaterialEndpoint(compositeEndpoint: string) {
    if (!compositeEndpoint)
        throw new ClientError("path parameter is missing.", 400);

    if (typeof compositeEndpoint !== "string")
        throw new ClientError("path parameter is not a string.", 400);

    if (!compositeEndpoint.length)
        throw new ClientError("path parameter is empty.", 400)

    const params = compositeEndpoint.split(",").map(param => param.trim());

    if (params.some(param => !param.length || isNaN(+param)))
        throw new ClientError("path parameter values are not valid.", 400);
    
    return params;
}