import { Router } from "express";

import { validate } from "../validators/validate";
import { inventoriesGetValidator, inventoriesPostValidator, inventoriesPutValidator, inventoriesDeleteValidator } from "../validators/route/inventoriesValidator";

import { getInventories } from "../controllers/Inventory/getInventories";
import { postInventories } from "../controllers/Inventory/postInventories";
import { putInventories } from "../controllers/Inventory/putInventories";
import { deleteInventories } from "../controllers/Inventory/deleteInventories";

export const inventoryRouter = Router();
const errorMsg = "Something went wrong with the inventories request.";

inventoryRouter.get(["/", "/:id"], inventoriesGetValidator, validate(errorMsg), getInventories);

inventoryRouter.post("/", inventoriesPostValidator, validate(errorMsg), postInventories);

inventoryRouter.put("/:id", inventoriesPutValidator, validate(errorMsg), putInventories);

inventoryRouter.delete("/:id", inventoriesDeleteValidator, validate(errorMsg), deleteInventories);
