import { Router } from "express";

import { validate } from "../validators/validate";
import { inventoriesGetValidator, inventoriesPostValidator, inventoriesPutValidator, inventoriesDeleteValidator } from "../validators/route/inventoriesValidator";

import { getInventories } from "../services/Inventory/getInventories";
import { postInventories } from "../services/Inventory/postInventories";
import { putInventories } from "../services/Inventory/putInventories";
import { deleteInventories } from "../services/Inventory/deleteInventories";

export const inventoryRouter = Router();
const errorMsg = "Something went wrong with the inventories request.";

inventoryRouter.get(["/", "/:id"], inventoriesGetValidator, validate(errorMsg), getInventories);

inventoryRouter.post("/", inventoriesPostValidator, validate(errorMsg), postInventories);

inventoryRouter.put("/:id", inventoriesPutValidator, validate(errorMsg), putInventories);

inventoryRouter.delete("/:id", inventoriesDeleteValidator, validate(errorMsg), deleteInventories);
