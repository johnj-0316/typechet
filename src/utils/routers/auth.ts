import { Router } from "express";
import { body } from "express-validator";

import { registerUser } from "../controllers/registerUser";
import { loginUser } from "../controllers/loginUser";

export const authRouter = Router();

// array contains validators: 
// email must be email, otherwise err msg
// password must be length of 8+

authRouter.post("/register", [
    body("email").trim().isEmail().withMessage("Not a valid email format."),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters.")
], registerUser);

authRouter.post("/login", [
    body("email").trim().isEmail().withMessage("Invalid format"),
    body("password").isLength({ min: 8 }).withMessage("Invalid format")
], loginUser);