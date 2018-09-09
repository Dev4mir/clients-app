import multer from "multer";

import Client from "../models/client";

const storage = multer.diskStorage({
  // destination: 'uploads/',
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().getTime() + "_" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports.getClients = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      message: "UnauthorizedError: private content"
    });
  } else {
    let filters = req.payload.isAdmin ? {} : { UID: req.payload._id };

    Client.find(filters).exec((err, clients) => {
      if (err) {
        console.log(err);
      } else {
        res.json(clients);
      }
    });
  }
};

module.exports.addClient = (req, res) => {
  let client = new Client(req.body);
  req.files.forEach(el => {
    client.clientImages.push(el.filename);
  });
  client
    .save()
    .then(client => {
      res.status(200).json({ Client: "Added" });
    })
    .catch(err => {
      res.status(400).send("Falid!");
    });
  req.app.io.emit("new client", { client: client });
};

module.exports.editClient = (req, res, next) => {
  Client.findById(req.params.id, (err, client) => {
    if (!client) {
      return next(new Error("Could not load document"));
    } else {
      req.files.forEach(el => {
        client.clientImages.push(el.filename);
      });
      client.name = req.body.name;
      client.phone = req.body.phone;
      client.mobile = req.body.mobile;
      client.address = req.body.address;
      client.username = req.body.username;
      client.password = req.body.password;

      client
        .save()
        .then(() => {
          res.json("Update done");
          req.app.io.emit("edit client", { client: client });
        })
        .catch(err => {
          res.status(400).send("update faild!");
        });
    }
  });
};
