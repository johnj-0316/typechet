import { Router } from "express";

import { getOwners } from "../controllers/Owner/getOwners";

export const ownerRouter = Router();

ownerRouter.get(["/", "/:id"], getOwners);

//ownerRouter.post

//ownerRouter.put

//ownerRouter.delete

