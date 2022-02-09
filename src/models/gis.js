const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Gis = sequelize.define("Gis", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Summary_Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    URL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Gis;
};
