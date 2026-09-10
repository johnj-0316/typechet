import validator from "validator";

export function compositeEndpointValidator(value: string) {
    const params = value.split(",");

    if (params.length !== 2 || !validator.isUUID(params[0]) ||isNaN(+params[1]))
        throw new Error("path parameter values are not valid");

    return true;
}