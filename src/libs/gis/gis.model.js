const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Gis = require("../../models/gis")(sequelize, Sequelize);
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

Gis.sync({ force: false });
exports.createGis = (GisData) => {
  return new Promise(async (resolve, reject) => {

    if (GisData.Title === undefined) {
      return reject({ message: "Body is required!!!" })
    }

    Gis.create(GisData).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ message: "User creation failed" });
      }
    );
  });
};

exports.findGisById = (id) => {
  return new Promise((resolve, reject) => {
    Gis.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, message: "Gis not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.updateGisById = (GisData, id) => {
  return new Promise((resolve, reject) => {
    Gis.update(GisData, {
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};
exports.deleteGisById = (id) => {
  return new Promise((resolve, reject) => {
    Gis.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0)
          resolve({ message: "Deleted successfully!!!" });
        else reject({ message: "Entry does not exist!!!" })
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findAllGis = () => {
  return new Promise((resolve, reject) => {
    Gis.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};
