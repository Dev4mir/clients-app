"use strict";

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendJSONresponse = function sendJSONresponse(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function (req, res) {
  if (!req.body.name || !req.body.username || !req.body.password) {
    sendJSONresponse(res, 400, {
      message: "كل الحقول مطلوبة"
    });
    return;
  }
  _user2.default.find({ username: req.body.username }, function (err, user) {
    if (!err) {
      if (user.length > 0) {
        sendJSONresponse(res, 400, {
          message: "العميل موجود سابقا"
        });
      } else {
        var user = new _user2.default();

        user.name = req.body.name;
        user.username = req.body.username;
        user.role = req.body.role;

        user.setPassword(req.body.password);

        user.save(function (err) {
          var token;
          token = user.generateJwt();
          sendJSONresponse(res, 200, {
            message: "تم اضافة العميل"
          });
        });
      }
    } else {
      sendJSONresponse(res, 400, {
        message: err
      });
    }
  });
};

module.exports.login = function (req, res) {
  _passport2.default.authenticate("local", function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    console.log(user);
    // If a user is found
    if (user) {
      if (user.active) {
        token = user.generateJwt();
        res.status(200);
        res.json({
          token: token
        });
      } else {
        res.status(401).json("العميل ليس نشط");
      }
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};