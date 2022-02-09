const GisController = require("./gis.controller");
const verifyToken = require("../Auth/VerifyToken")

exports.GisRoutes = function (app) {
  app.post("/gis/create", [GisController.insert]);

  app.get("/gis/:gisID", [GisController.findGisById]);

  app.put("/gis/:gisID", [GisController.updateGisById]);

  app.delete("/gis/:gisID", [GisController.deleteGisById]);

  app.get("/gis", [GisController.findAllGis]);
};
