const { Router } = require("express");

const UserController = require("../controllers/UserController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userController = new UserController();

const userRoutes = Router();

userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated, userController.upDate);

module.exports = userRoutes;