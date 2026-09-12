import { CustomValidator } from "express-validator";

export const materialEndpointValidator: CustomValidator = (value: string): boolean => {
    if (typeof value !== "string")
        throw new Error("path parameter is not a string.");

    if (!value.length)
        throw new Error("path parameter is empty.")

    const params = value.split(",").map(param => param.trim());

    if (params.some(param => !param.length || isNaN(+param)) || params.length > 2)
        throw new Error("path parameter values are not valid.");
    
    return true;
}