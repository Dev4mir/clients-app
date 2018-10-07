"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressJwt = require("express-jwt");

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _authentication = require("../controllers/authentication");

var _authentication2 = _interopRequireDefault(_authentication);

var _users = require("../controllers/users");

var _users2 = _interopRequireDefault(_users);

var _clients = require("../controllers/clients");

var _clients2 = _interopRequireDefault(_clients);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = (0, _expressJwt2.default)({
  secret: "abc123",
  userProperty: "payload"
});

var router = _express2.default.Router();

router.get("/clients", auth, _clients2.default.getClients);
router.post("/clients/add", auth, _clients2.default.upload.array("clientImages"), _clients2.default.addClient);
router.post("/clients/edit/:id", auth, _clients2.default.upload.array("clientImages"), _clients2.default.editClient);

// User Routes
router.get("/users", auth, _users2.default.getUsers);
router.post("/users/edit/:id", auth, _users2.default.editUser);

// authentication
router.post("/auth/register", auth, _authentication2.default.register);
router.post("/auth/login", _authentication2.default.login);

module.exports = router;