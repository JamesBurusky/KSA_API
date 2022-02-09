const EventsModel = require("./event.model");

exports.insert = (req, res) => {
  EventsModel.createEvent(req.body).then(
    (result) => {
      res.status(200).send({ message: "Event Created successfully" });
    },
    (err) => {
      console.log(err);
      res.status(406).send(err);
    }
  );
};


exports.findEventById = (req, res) => {
  EventsModel.findEventById(req.params.gisID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err.message);
    }
  );
};

exports.updateEventById = (req, res) => {
  EventsModel.updateEventById(req.body, req.params.gisID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err);
    }
  );
};

exports.deleteEventById = (req, res) => {
  EventsModel.deleteEventById(req.params.gisID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err);
    }
  );
};

exports.findAllEvents = (req, res) => {
  EventsModel.findAllEvents().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err);
    }
  );
};
