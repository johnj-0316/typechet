import validator from "validator";

export function countryCodeValidator(value: string): boolean {
    if (!validator.isISO31661Alpha2(value) && !validator.isISO31661Alpha3(value)) {
        throw new Error('Country code must be a valid ISO 3166-1 Alpha-2 or Alpha-3 code');
    }

    return true;
}