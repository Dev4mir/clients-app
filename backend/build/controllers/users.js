"use strict";

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.getUsers = function (req, res) {
  _user2.default.find().select("-hash -salt").exec(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
};

module.exports.editUser = function (req, res, next) {
  console.log("edit user");
  _user2.default.findById(req.params.id, function (err, user) {
    if (!user) {
      return next(new Error("Could not load document"));
    } else {
      user.name = req.body.name;
      user.username = req.body.username;
      user.isAdmin = req.body.isAdmin;
      user.active = req.body.active;

      user.save().then(function () {
        res.json("تم التعديل");
        req.app.io.emit("edit user", { user: user });
      }).catch(function (err) {
        res.status(400).send("خطأ فى التعديل");
      });
    }
  });
};