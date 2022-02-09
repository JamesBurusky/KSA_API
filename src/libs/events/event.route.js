const EventsController = require("./event.controller");
const verifyToken = require("../Auth/VerifyToken")

exports.EventsRoutes = function (app) {
  app.post("/events/add", [EventsController.insert]);

  app.get("/events/:gisID", [EventsController.findEventById]);

  app.put("/events/:gisID", [EventsController.updateEventById]);

  app.delete("/events/:gisID", [EventsController.deleteEventById]);

  app.get("/events", [EventsController.findAllEvents]);
};
