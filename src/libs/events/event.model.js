const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Event = require("../../models/event")(sequelize, Sequelize);
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

Event.sync({ force: false });
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
