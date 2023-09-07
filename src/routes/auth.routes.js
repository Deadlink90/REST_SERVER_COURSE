const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validateFields.middleware");
const router = Router();

router.post(
  "/login",
  [
    check("email", "invalid field (email)").isEmail(),
    check("password", "invalidF field (password)").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
