import validator from "validator";
import { CustomValidator } from "express-validator";
import { ClientError } from "../../errors/Error";

export const ownerEndpointValidator: CustomValidator = (value: string): boolean => {
    const params = value.split(",");

    if (params.length !== 2 || !validator.isUUID(params[0]) ||isNaN(+params[1]))
        throw new ClientError("path parameter values are not valid", 400);

    return true;
}