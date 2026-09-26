import { GetColorName } from "hex-color-to-color-name";
import { ClientError } from "../errors/Error";

export function handleHexCodeConversion(hexCode: string): string {
    if (!hexCode.startsWith("#"))
        return "None";

    const colorName = GetColorName(hexCode);

    if (colorName.startsWith("Invalid Color:"))
        throw new ClientError(`Invalid hex code: ${hexCode}`, 400);

    return GetColorName(hexCode);
}