const EventsController = require("./event.controller");
const EventsModel = require("./event.model")
const verifyToken = require("../Auth/VerifyToken")

exports.EventsRoutes = function (app) {
  app.post("/events/add", [EventsModel.uploadThumbnail, EventsController.insert]);

  app.get("/events/category", [EventsController.findEventCategory]);

  app.get("/events/category/:category", [EventsController.findEventByCategory]);

  app.get("/events/:gisID", [EventsController.findEventById]);

  app.put("/events/:gisID", [EventsController.updateEventById]);

  app.delete("/events/:gisID", [EventsController.deleteEventById]);

  app.get("/events", [EventsController.findAllEvents]);
};
