import { Router } from "express";

import { validate } from "../validators/validate";
import { loginValidator, registerValidator } from "../validators/route/authValidators";

import { registerUser } from "../services/User/registerUser";
import { loginUser } from "../services/User/loginUser";
import { findUser } from "../services/User/findUser";
import { authUser } from "../services/User/authUser";

export const authRouter = Router();

// array contains validators: 
// email must be email, otherwise err msg
// password must be length of 8+

authRouter.get("/profile", authUser, findUser);

authRouter.post("/register", registerValidator, validate("Something went wrong with registering."), registerUser);

authRouter.post("/login", loginValidator, validate("Something went wrong with logging in."), loginUser);
