import { CustomValidator } from "express-validator";
import { ClientError } from "../errors/Error";

export const materialEndpointValidator: CustomValidator = (value: string): boolean => {
    if (typeof value !== "string")
        throw new ClientError("path parameter is not a string.", 400);

    if (!value.length)
        throw new ClientError("path parameter is empty.", 400)

    const params = value.split(",").map(param => param.trim());

    if (params.some(param => !param.length || isNaN(+param)) || params.length > 2)
        throw new ClientError("path parameter values are not valid.", 400);
    
    return true;
}