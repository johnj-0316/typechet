import { Pair } from "../controllers/Pattern/pattern.types";
import { Request } from "express";

// checks if colors and sizes obj from body have the same keys
// otherwise return false (error also works)
export default function patternKeyMatch(value: Pair, { req }: { req: Request }) {
    const colorKeys = Object.keys(value);
    const sizeKeys = Object.keys(req.body.sizes);

    if (colorKeys.length !== sizeKeys.length)
        return false;

    const colorSet = new Set(colorKeys);

    return sizeKeys.every(key => colorSet.has(key));
}