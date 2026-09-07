import { Router } from "express";

import { getOwners } from "../controllers/Owner/getOwners";
import { postOwners } from "../controllers/Owner/postOwners";

export const ownerRouter = Router();

ownerRouter.get(["/", "/:pattern_id"], getOwners);

ownerRouter.post("/", postOwners);

//ownerRouter.put

//ownerRouter.delete

