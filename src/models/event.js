const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Events", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    X: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Y: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Pictures: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Event;
};
