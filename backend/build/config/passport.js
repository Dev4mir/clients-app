"use strict";

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require("passport-local");

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport2.default.use(new _passportLocal2.default.Strategy(function ($username, $password, done) {
  _user2.default.findOne({ username: $username }, function (err, user) {
    if (err) {
      return done(err);
    }
    // Return if user not found in database
    if (!user) {
      return done(null, false, {
        message: "لم يتم العثور على المستخدم"
      });
    }
    // Return if password is wrong
    if (!user.validPassword($password)) {
      return done(null, false, {
        message: "كلمة السر خاطئة"
      });
    }
    // If credentials are correct, return the user object
    return done(null, user);
  });
}));