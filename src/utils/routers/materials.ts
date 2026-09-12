import { Router } from "express";
import { body, param, query } from "express-validator";

import { getMaterials } from "../controllers/Material/getMaterials";
import { postMaterials } from "../controllers/Material/postMaterials";
import { putMaterials } from "../controllers/Material/putMaterials";
import { deleteMaterials } from "../controllers/Material/deleteMaterials";

export const materialRouter = Router();

materialRouter.get(["/", "/:pattern_id_material_id"], [
], getMaterials);

materialRouter.post("/", [
], postMaterials);

materialRouter.put("/:id", [
], putMaterials);

materialRouter.delete("/:pattern_id_material_id", [
], deleteMaterials);