import { Router } from "express";
import { body } from "express-validator";

import { registerUser } from "../controllers/registerUser";

export const registerRouter = Router();

// array contains validators: 
// email must be email, otherwise err msg
// password must be length of 8+

registerRouter.post("/register", [
    body("email").trim().isEmail().withMessage("Not a valid email format."),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters.")
], registerUser);