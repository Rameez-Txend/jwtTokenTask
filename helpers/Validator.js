import { check } from "express-validator";

const registerValidator = [
  check("name", "Name is requred").exists().isLength({
    min: 3,
  }),

  check("email", "Email is required").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),

  check("password", "password is required").exists().isLength({
    min: 3,
  }),
];

const loginValidator = [
  check("email", "email is required").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "password is required").not().isEmpty(),
];

export { registerValidator, loginValidator };
