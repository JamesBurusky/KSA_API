const AuthController = require("./Auth.controller");
const verifyToken = require("./VerifyToken")

exports.AuthRoutes = function (app) {
  app.post("/auth/register", [AuthController.insert]);

  app.post("/auth/login", [AuthController.login]);

  app.get("/auth/logout", [verifyToken,AuthController.logout]);

  app.get("/auth/:authID", [verifyToken,AuthController.findAuthById]);

  app.put("/auth/:authID", [verifyToken,AuthController.updateAuthById]);

  app.delete("/auth/:authID", [verifyToken,AuthController.deleteAuthById]);

  app.get("/auth", [verifyToken,AuthController.findAllAuth]);


};
