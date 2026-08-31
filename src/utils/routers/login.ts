import { Router } from "express";
import { body } from "express-validator";
import { loginUser } from "../controllers/loginUser";

export const loginRouter = Router();

loginRouter.post("/login", [
    body("email").trim().isEmail().withMessage("Invalid format"),
    body("password").isLength({ min: 8 }).withMessage("Invalid format")
], loginUser);