import { Router } from "express";
import { body } from "express-validator";

import { registerUser } from "../controllers/User/registerUser";
import { loginUser } from "../controllers/User/loginUser";
import { findUser } from "../controllers/User/findUser";

export const authRouter = Router();

// array contains validators: 
// email must be email, otherwise err msg
// password must be length of 8+

authRouter.get("/profile", findUser);

authRouter.post("/register", [
    body("username").escape().trim().isLength({ min: 5, max: 15 }).withMessage("username must be between 3 to 75 characters."),
    body("email").trim().isEmail().withMessage("not a valid email format."),
    body("password").isLength({ min: 8 }).withMessage("password must be at least 8 characters.")
], registerUser);

authRouter.post("/login", [
    body("email").trim().isEmail().withMessage("invalid format"),
    body("password").isLength({ min: 8 }).withMessage("password must be at least 8 characters.")
], loginUser);