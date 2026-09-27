import { Router } from "express";

import { validate } from "../validators/validate";
import { materialsGetValidator, materialsPostValidator, materialsPutValidator, materialsDeleteValidator } from "../validators/route/materialsValidator";

import { getMaterials } from "../controllers/Material/getMaterials";
import { postMaterials } from "../controllers/Material/postMaterials";
import { putMaterials } from "../controllers/Material/putMaterials";
import { deleteMaterials } from "../controllers/Material/deleteMaterials";

export const materialRouter = Router();
const errorMsg = "Something went wrong with the materials request.";

materialRouter.get(["/", "/:pattern_id_material_id"], materialsGetValidator, validate(errorMsg), getMaterials);

materialRouter.post("/", materialsPostValidator, validate(errorMsg), postMaterials);

materialRouter.put("/:id", materialsPutValidator, validate(errorMsg), putMaterials);

materialRouter.delete("/:pattern_id_material_id", materialsDeleteValidator, validate(errorMsg), deleteMaterials);
