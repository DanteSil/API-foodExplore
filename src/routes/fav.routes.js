const { Router } = require("express");

const FavController = require("../controllers/FavController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const favController = new FavController();

const favRoutes = Router();

favRoutes.use(ensureAuthenticated);

favRoutes.patch("/", favController.update);
favRoutes.get("/", favController.show);
favRoutes.post("/", favController.create);

module.exports = favRoutes;