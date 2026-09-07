import { Meta } from "express-validator";
import { CustomValidator } from "express-validator";

import { Pair } from "../controllers/Pattern/pattern.types";

// checks if colors and sizes obj from body have the same keys
export const patternKeyValidator: CustomValidator = (
    colors: Pair, 
    { req }: Meta
) => {
    const colorKeys = Object.keys(colors).map(key => key.trim().toLowerCase());
    const sizeKeys = Object.keys(req.body.sizes).map(key => key.trim().toLowerCase());

    if (colorKeys.length !== sizeKeys.length)
        return false;

    const colorSet = new Set(colorKeys);

    return sizeKeys.every(key => colorSet.has(key));
}