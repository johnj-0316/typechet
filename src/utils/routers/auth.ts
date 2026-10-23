import { Router } from "express";
import passport from "passport";

import { validate } from "../validators/validate";
import { loginValidator, registerValidator } from "../validators/route/authValidator";

import { registerUser } from "../controllers/User/registerUser";
import { loginUser } from "../controllers/User/loginUser";
import { findUser } from "../controllers/User/findUser";
import { authUser } from "../controllers/User/authUser";
import { logoutUser } from "../controllers/User/logoutUser";

import { authLimiter } from "../../security/authLimit";
import { registerLimit } from "../../security/registerLimit";
import { editUser } from "../controllers/User/editUser";
import { profileValidator } from "../validators/route/profileValidator";
import { profileLimit } from "../../security/profileLimit";

export const authRouter = Router();

// array contains validators: 
// email must be email, otherwise err msg
// password must be length of 8+

authRouter.get("/profile", authUser, findUser);

authRouter.put("/profile", 
    authUser, 
    profileLimit,
    profileValidator, 
    validate("Something went wrong with editing your profile."),
    editUser);

authRouter.post("/register",
    registerLimit,
    registerValidator,
    validate("Something went wrong with registering."),
    registerUser);

authRouter.post("/login",
    authLimiter,
    loginValidator,
    validate("Something went wrong with logging in."),
    passport.authenticate("local"),
    loginUser);

authRouter.post("/logout",
    authUser,
    logoutUser);
