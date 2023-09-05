const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields.middleware");
const {
  isRoleValid,
  existsEmail,
  existsUser,
} = require("../helpers/dbValidators");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "invalid field (name)").not().isEmpty(),
    check("email", "invalid field (email)").isEmail().custom(existsEmail),
    check("password", "invalid field (password)").isLength({ min: 6 }),
    // check('role','invalid field (role)').isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  createUser
);

router.put(
  "/:id",
  [
    check("id", "No valid id").isMongoId().custom(existsUser),
    check("rol").custom(isRoleValid),
    validateFields,
  ],
  updateUser
);

router.delete(
  "/:id",
  [check("id", "No valid id").isMongoId().custom(existsUser), validateFields],
  deleteUser
);

module.exports = router;
