const GisController = require("./gis.controller");
const GisModel = require("./gis.model")
const verifyToken = require("../Auth/VerifyToken")
const { Console } = require("console");

exports.GisRoutes = function (app) {
  app.post("/gis/create", [ GisModel.uploadThumbnail,GisController.insert]);

  
  app.get("/gis/category", [GisController.findCategory]);

  app.get("/gis/category/:category", [GisController.findByCategory]);

  app.get("/gis", [GisController.findAllGis]);

  app.get("/gis/:gisID", [GisController.findGisById]);

  app.put("/gis/:gisID", [GisController.updateGisById]);

  app.delete("/gis/:gisID", [GisController.deleteGisById]);

 

};
