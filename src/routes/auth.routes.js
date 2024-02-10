const express = require("express");

const { Login } = require("../controllers/auth.controllers");

const AuthRouter = express.Router();
console.log("Welcome");
AuthRouter.post("/login", Login);

module.exports = { AuthRouter };
