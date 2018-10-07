"use strict";

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _client2 = require("../models/client");

var _client3 = _interopRequireDefault(_client2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer2.default.diskStorage({
  // destination: 'uploads/',
  destination: function destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function filename(req, file, cb) {
    cb(null, new Date().getTime() + "_" + file.originalname);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports.upload = (0, _multer2.default)({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports.getClients = function (req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      message: "UnauthorizedError: private content"
    });
  } else {
    var filters = req.payload.isAdmin ? {} : { UID: req.payload._id };

    _client3.default.find(filters).exec(function (err, clients) {
      if (err) {
        console.log(err);
      } else {
        res.json(clients);
      }
    });
  }
};

module.exports.addClient = function (req, res) {
  _client3.default.find({ phone: req.body.phone }).exec(function (err, client) {
    if (!err) {
      if (client.length > 0) {
        res.status(401).send("العميل مسجل سابقاً");
      } else {
        var _client = new _client3.default(req.body);
        req.files.forEach(function (el) {
          _client.clientImages.push(el.filename);
        });
        _client.save().then(function (client) {
          res.status(200).json("تم اضافة العميل");
          req.app.io.emit("new client", { client: client });
        }).catch(function (err) {
          res.status(400).send("حدث خطأ");
        });
      }
    } else {
      res.status(400).json({ message: err });
    }
  });
};

module.exports.editClient = function (req, res, next) {
  _client3.default.findById(req.params.id, function (err, client) {
    if (!client) {
      return next(new Error("Could not load document"));
    } else {
      req.files.forEach(function (el) {
        client.clientImages.push(el.filename);
      });
      client.name = req.body.name;
      client.phone = req.body.phone;
      client.mobile = req.body.mobile;
      client.address = req.body.address;
      client.username = req.body.username;
      client.password = req.body.password;
      client.idNumber = req.body.idNumber;

      client.save().then(function () {
        res.json("تم التعديل");
        req.app.io.emit("edit client", { client: client });
      }).catch(function (err) {
        res.status(400).send("خطأ فى التعديل");
      });
    }
  });
};