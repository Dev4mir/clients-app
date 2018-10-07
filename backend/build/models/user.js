"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function (password) {
  this.salt = _crypto2.default.randomBytes(16).toString("hex");
  this.hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};
UserSchema.methods.validPassword = function (password) {
  var hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return _jsonwebtoken2.default.sign({
    _id: this._id,
    username: this.username,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
    isAdmin: this.isAdmin
  }, "abc123" // DO NOT KEEP YOUR SECRET IN THE CODE!
  );
};

module.exports = _mongoose2.default.model("User", UserSchema);