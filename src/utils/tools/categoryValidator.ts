import { CustomValidator } from "express-validator";

import { categories, categoryTypes } from "./handleInventoryCategory";

export const categoryValidator: CustomValidator = (category: categoryTypes): boolean => {
    return categories.includes(category.toLowerCase() as categoryTypes);
}