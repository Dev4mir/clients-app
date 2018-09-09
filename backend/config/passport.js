import passport from "passport";
import LocalStrategy from "passport-local";
import mongoose from "mongoose";
import User from "../models/user";

passport.use(
  new LocalStrategy.Strategy(function($username, $password, done) {
    User.findOne({ username: $username }, function(err, user) {
      if (err) {
        return done(err);
      }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: "User not found"
        });
      }
      // Return if password is wrong
      if (!user.validPassword($password)) {
        return done(null, false, {
          message: "Password is wrong"
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  })
);
