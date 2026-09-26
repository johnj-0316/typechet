import { CustomValidator } from "express-validator";
import { isValidCurrencySymbol, isValidCurrencyCode, CurrencyCode } from "currency-code-symbol-map";

export const currencySymbolCodeValidator: CustomValidator = (cost_unit: string): boolean => {
    return isValidCurrencySymbol(cost_unit) || isValidCurrencyCode(cost_unit as CurrencyCode);
}