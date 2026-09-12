import { GetColorName } from "hex-color-to-color-name";

export function handleHexCodeConversion(hexCode: string): string {
    if (!hexCode.startsWith("#"))
        return "None";

    return GetColorName(hexCode);

}