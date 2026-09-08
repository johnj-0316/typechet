import { Router } from "express";

import { getOwners } from "../controllers/Owner/getOwners";
import { postOwners } from "../controllers/Owner/postOwners";
import { putOwners } from "../controllers/Owner/putOwners";

export const ownerRouter = Router();

ownerRouter.get(["/", "/:pattern_id"], getOwners);

ownerRouter.post("/", postOwners);

ownerRouter.put("/:user_pattern_id", putOwners);

//ownerRouter.delete

