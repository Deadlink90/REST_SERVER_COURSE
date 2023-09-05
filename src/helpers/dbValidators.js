const User = require("../models/user.model");
const Role = require("../models/role.model");

const isRoleValid = async (role = "") => {
  const roleExist = await Role.findOne({ name: role });
  if (!roleExist) {
    throw new Error("Role not valid");
  }
};

const existsEmail = async (email) => {
  const emailExists = await User.findOne({ email });
  if (emailExists) throw new Error(`The email ${email} already exists!!`);
};

const existsUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error(`User not founded`);
};

module.exports = {
  isRoleValid,
  existsEmail,
  existsUser
};
