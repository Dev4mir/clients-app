import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.io = io;

import routesApi from "./routes/index";

server.listen(4000);

mongoose.connect(
  "mongodb://localhost:27017/clients",
  { useNewUrlParser: true }
);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("mongodb connection done!");
});

require("./models/user");
require("./config/passport");

app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));
app.use("/", express.static("public"));
app.use(passport.initialize());
app.use("/api/", routesApi);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }
});

io.on("connection", socket => {
  console.log("socket is running...");
});
