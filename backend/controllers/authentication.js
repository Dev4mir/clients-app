import passport from "passport";
import mongoose from "mongoose";
import User from "../models/user";

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  if (!req.body.name || !req.body.username || !req.body.password) {
    sendJSONresponse(res, 400, {
      message: "كل الحقول مطلوبة"
    });
    return;
  }
  User.find({ username: req.body.username }, function(err, user) {
    if (!err) {
      if (user.length > 0) {
        sendJSONresponse(res, 400, {
          message: "العميل موجود سابقا"
        });
      } else {
        var user = new User();

        user.name = req.body.name;
        user.username = req.body.username;
        user.isAdmin = req.body.isAdmin;
        user.role = req.body.role;
        user.active = req.body.active;

        user.setPassword(req.body.password);

        user.save(function(err) {
          var token;
          token = user.generateJwt();
          req.app.io.emit("new user", { user: user });
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

module.exports.login = function(req, res) {
  passport.authenticate("local", function(err, user, info) {
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
