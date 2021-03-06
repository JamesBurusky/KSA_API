const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Gis = require("../../models/gis")(sequelize, Sequelize);
const multer = require("multer");
const Path = require("path");
const { Console } = require("console");

let upload = multer({
  limits: { fileSize: 5000000},
  fileFilter: (req, file, callback) => {
    const acceptableExtensions = [".png", ".jpg"];
    if (!acceptableExtensions.includes(Path.extname(file.originalname))) {
      console.log(req.body);
      return callback(new Error("Unsupported format"));
    }
    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 5000000) {
      return callback(new Error("Image too large"));
    }
    callback(null, true);
  },
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  }),
});

Gis.sync({ force: false });


exports.uploadThumbnail = upload.single('Thumbnail')


// exports.checklog = (req) => {
//   return new Promise(async (resolve, reject) => {
//     console.log("Checklog called..");
//     console.log("");
//     console.log(req.body);
//   });
// };


exports.createGis = (GisData) => {
  return new Promise(async (resolve, reject) => {

    if (GisData.Title === undefined) {
      return reject({ message: "Body is required!!!" })
    }

    console.log(GisData)

    Gis.create(GisData).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        console.log(err)
        reject({ message: "Creation failed" });
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

exports.findCategory = () => {
  return new Promise((resolve, reject) => {
    Gis.findAll({
      attributes:  [Sequelize.fn('DISTINCT', Sequelize.col('Category')) ,'Category'],
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

exports.findByCategory = (category) => {
  return new Promise((resolve, reject) => {
    Gis.findAll(
      {
        where: {
          Category: category,
        },
      }
    ).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, message: "Not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};