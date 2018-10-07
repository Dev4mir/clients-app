import User from "../models/user";

module.exports.getUsers = function(req, res) {
  User.find()
    .select("-hash -salt")
    .exec((err, users) => {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    });
};

module.exports.editUser = (req, res, next) => {
  console.log("edit user");
  User.findById(req.params.id, (err, user) => {
    if (!user) {
      return next(new Error("Could not load document"));
    } else {
      user.name = req.body.name;
      user.username = req.body.username;
      user.isAdmin = req.body.isAdmin;
      user.role = req.body.role;
      user.active = req.body.active;
      if (req.body.newPassword.trim() !== "") {
        user.setPassword(req.body.newPassword);
      }

      user
        .save()
        .then(() => {
          res.json("تم التعديل");
          req.app.io.emit("edit user", { user: user });
        })
        .catch(err => {
          res.status(400).send("خطأ فى التعديل");
        });
    }
  });
};
