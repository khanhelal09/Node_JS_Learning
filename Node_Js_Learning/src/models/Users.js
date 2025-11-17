const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/dbSequelize");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Name is required" },
    },
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: { msg: "Email already exists" },
    validate: {
      isEmail: { msg: "Must be a valid email" },
    },
  },
},{
  tableName: "Users",
  timestamps: false
});

module.exports = User;
