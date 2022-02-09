require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const env = require("./configs/env");
const Auth = require("./libs/Auth/Auth.route");
const Gis = require("./libs/gis/gis.route");
const Events = require('./libs/events/event.route');


const app = express();
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
Auth.AuthRoutes(app);
Gis.GisRoutes(app);
Events.EventsRoutes(app);


app.listen(env.port, function () {
  console.log("app listening at port %s", 3001);
});