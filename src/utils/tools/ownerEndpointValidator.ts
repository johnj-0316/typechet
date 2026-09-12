import validator from "validator";
import { CustomValidator } from "express-validator";

export const ownerEndpointValidator: CustomValidator = (value: string): boolean => {
    const params = value.split(",");

    if (params.length !== 2 || !validator.isUUID(params[0]) ||isNaN(+params[1]))
        throw new Error("path parameter values are not valid");

    return true;
}