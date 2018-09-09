import User from "../models/user";

module.exports.getUsers = function(req, res) {
  User.find().exec((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
};
