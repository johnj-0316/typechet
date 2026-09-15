import { CustomValidator } from "express-validator";

import { categories, categoryTypes } from "./handleInventoryCategory";

export const categoryValidator: CustomValidator = (category: categoryTypes): boolean => {
    if (!categories.includes(category))
        return false;

    return categories.includes(category);
}