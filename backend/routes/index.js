import express from "express";
import jwt from "express-jwt";

import userAuth from "../controllers/authentication";
import users from "../controllers/users";
import clients from "../controllers/clients";

var auth = jwt({
  secret: "abc123",
  userProperty: "payload"
});

const router = express.Router();

router.get("/clients", auth, clients.getClients);
router.post(
  "/clients/add",
  auth,
  clients.upload.array("clientImages"),
  clients.addClient
);
router.post(
  "/clients/edit/:id",
  auth,
  clients.upload.array("clientImages"),
  clients.editClient
);

// User Routes
router.get("/user", auth, users.getUsers);

// authentication
router.post("/auth/register", auth, userAuth.register);
router.post("/auth/login", userAuth.login);

module.exports = router;
