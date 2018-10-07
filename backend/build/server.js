"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _index = require("./routes/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.io = io;

server.listen(4000);

_mongoose2.default.connect("mongodb://localhost:27017/clients", { useNewUrlParser: true });

var connection = _mongoose2.default.connection;

connection.once("open", function () {
  console.log("mongodb connection done!");
});

require("./models/user");
require("./config/passport");

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());

app.use("/uploads", _express2.default.static("uploads"));
// app.use("/", express.static("public"));
// app.use(express.static(path.join(__dirname, "../uploads")));
app.use(_express2.default.static(_path2.default.join(__dirname, "../public")));
console.log(_path2.default.join(__dirname, "../public"));

app.use(_passport2.default.initialize());
app.use("/api/", _index2.default);

app.get("*", function (req, res) {
  res.sendFile(_path2.default.join(__dirname, "../public/index.html"));
  console.log(_path2.default.join(__dirname, "../public/index.html"));
});

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }
});

io.on("connection", function (socket) {
  console.log("socket is running...");
});