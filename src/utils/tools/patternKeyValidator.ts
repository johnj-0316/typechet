import { Meta } from "express-validator";
import { CustomValidator } from "express-validator";

import { Pair } from "../controllers/Pattern/pattern.types";

// checks if colors and sizes obj from body have the same keys
// CustomValidator doesnt like param types apparently
export const patternKeyValidator: CustomValidator = (
    colors: Pair, 
    { req }: Meta
) => {
    const colorKeys = Object.keys(colors);
    const sizeKeys = Object.keys(req.body.sizes);

    if (colorKeys.length !== sizeKeys.length)
        return false;

    const colorSet = new Set(colorKeys);

    return sizeKeys.every(key => colorSet.has(key));
}