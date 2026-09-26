// delimeter will be comma
// structure should be
// user_id,pattern_id

import { ClientError } from "../errors/Error";

export function handleOwnerEndpoint(compositeEndpoint: string) {
    if (typeof compositeEndpoint !== "string")
        throw new Error("path parameter is not a string.");

    const params = compositeEndpoint.split(",");

    if (params.length !== 2 || isNaN(+params[1]))
        throw new ClientError("path parameter values are not valid", 400);

    return params.map(param => param.trim());
}