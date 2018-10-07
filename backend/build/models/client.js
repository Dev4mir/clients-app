"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ClientSchema = new Schema({
  UID: {
    type: String
  },
  userAddedDate: {
    type: Date
  },
  name: {
    type: String
  },
  phone: {
    type: Number,
    unique: true,
    required: true
  },
  mobile: {
    type: Number
  },
  address: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  clientImages: {
    type: Array
  },
  idNumber: {
    type: Number
  }
});

module.exports = _mongoose2.default.model("Client", ClientSchema);