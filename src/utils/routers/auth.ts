import { Router } from "express";
import { body } from "express-validator";

import { registerUser } from "../controllers/User/registerUser";
import { loginUser } from "../controllers/User/loginUser";
import { findUser } from "../controllers/User/findUser";

export const authRouter = Router();

// array contains validators: 
// email must be email, otherwise err msg
// password must be length of 8+

// need validator for dupe email

authRouter.get("/profile", findUser);

authRouter.post("/register", [
    body("email").trim().isEmail().withMessage("Not a valid email format."),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters.")
], registerUser);

authRouter.post("/login", [
    body("email").trim().isEmail().withMessage("Invalid format"),
    body("password").isLength({ min: 8 }).withMessage("Invalid format")
], loginUser);