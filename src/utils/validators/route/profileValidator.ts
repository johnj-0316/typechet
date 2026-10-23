import { body } from "express-validator";

export { profileValidator };

const profileValidator = [
    body("name").trim().isLength({ min: 5, max: 15 }).withMessage("username must be between 5 to 15 characters."),
    body("displayName").trim().isLength({ min: 2, max: 40 }).withMessage("name must be between 2 to 40 characters."),
    body("profileUrl").optional().isURL().withMessage("must be a valid url."),
    body("phone").optional().isMobilePhone("any").withMessage("must be a valid phone number.")

];
