import { Router } from "express";
import { body, param, query } from "express-validator";

import { getInventories } from "../controllers/Inventory/getInventories";
import { postInventories } from "../controllers/Inventory/postInventories";
import { putInventories } from "../controllers/Inventory/putInventories";
import { deleteInventories } from "../controllers/Inventory/deleteInventories";

export const inventoryRouter = Router();

inventoryRouter.get(["/", "/:id"], [
], getInventories);

inventoryRouter.post("/", [
], postInventories);

inventoryRouter.put("/:id", [
], putInventories);

inventoryRouter.delete("/:id", [
], deleteInventories);