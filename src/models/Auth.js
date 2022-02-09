const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define("Auth", {
    UserID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Auth;
};
