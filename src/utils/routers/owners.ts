import { Router } from "express";

import { validate } from "../validators/validate";
import { ownersGetValidator, ownersPostValidator, ownersPutValidator, ownersDeleteValidator } from "../validators/route/ownersValidator";

import { getOwners } from "../services/Owner/getOwners";
import { postOwners } from "../services/Owner/postOwners";
import { putOwners } from "../services/Owner/putOwners";
import { deleteOwners } from "../services/Owner/deleteOwners";

export const ownerRouter = Router();
const errorMsg = "Something went wrong with the owners request.";

ownerRouter.get(["/", "/:pattern_id"], ownersGetValidator, validate(errorMsg), getOwners);

ownerRouter.post("/", ownersPostValidator, validate(errorMsg), postOwners);

ownerRouter.put("/:user_pattern_id", ownersPutValidator, validate(errorMsg), putOwners);

ownerRouter.delete("/:user_pattern_id", ownersDeleteValidator, validate(errorMsg), deleteOwners);
