const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Event = require("../../models/event")(sequelize, Sequelize);
const multer = require("multer");
const Path = require("path");

let upload = multer({
  limits: { fileSize: 5000000},
  fileFilter: (req, file, callback) => {
    const acceptableExtensions = [".png", ".jpg"];
    if (!acceptableExtensions.includes(Path.extname(file.originalname))) {
      return callback(new Error("Unsupported format"));
    }
    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 5000000) {
      return callback(new Error("Image too large"));
    }
    callback(null, true);
  },
  storage: multer.diskStorage({
    destination: "uploads/events",
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  }),
});

Event.sync({ force: false });


exports.uploadThumbnail = upload.single('Thumbnail')

exports.createEvent = (EventsData) => {
  return new Promise(async (resolve, reject) => {

    if (EventsData.Title === undefined) {
      return reject({ message: "Body is required!!!" })
    }

    Event.create(EventsData).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ message: "User creation failed" });
      }
    );
  });
};

exports.findEventById = (id) => {
  return new Promise((resolve, reject) => {
    Event.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, message: "Event not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.updateEventById = (EventsData, id) => {
  return new Promise((resolve, reject) => {
    Event.update(EventsData, {
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
exports.deleteEventById = (id) => {
  return new Promise((resolve, reject) => {
    Event.destroy({
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

exports.findAllEvents = () => {
  return new Promise((resolve, reject) => {
    Event.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findEventCategory = () => {
  return new Promise((resolve, reject) => {
    Event.findAll({
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

exports.findEventByCategory = (category) => {
  return new Promise((resolve, reject) => {
    Event.findAll(
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
