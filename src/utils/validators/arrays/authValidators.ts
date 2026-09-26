import { body } from "express-validator";

export { registerValidator, loginValidator };

const registerValidator = [
    body("username").trim().isLength({ min: 5, max: 15 }).withMessage("username must be between 3 to 75 characters."),
    body("email").trim().isEmail().withMessage("not a valid email format."),
    body("password").isLength({ min: 8 }).withMessage("password must be at least 8 characters.")
];

const loginValidator = [
    body("email").trim().isEmail().withMessage("invalid format"),
    body("password").isLength({ min: 8 }).withMessage("password must be at least 8 characters.")
];
