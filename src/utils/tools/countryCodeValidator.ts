import validator from "validator";
import { CustomValidator } from "express-validator";

export const countryCodeValidator: CustomValidator = (value: string): boolean => {
    return validator.isISO31661Alpha2(value) || validator.isISO31661Alpha3(value);
}