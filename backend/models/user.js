import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

let UserSchema = new Schema({
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
  role: String,
  active: {
    type: Boolean,
    default: true
  },
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};
UserSchema.methods.validPassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
      isAdmin: this.isAdmin,
      role: this.role
    },
    "abc123" // DO NOT KEEP YOUR SECRET IN THE CODE!
  );
};

module.exports = mongoose.model("User", UserSchema);
