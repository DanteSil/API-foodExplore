const { Router } = require("express");

const AllOrderController = require("../controllers/AllOrderController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureIsAmin = require("../middlewares/ensureIsAmin");

const allOrderController = new AllOrderController();

const allOrderRoutes = Router();

allOrderRoutes.use(ensureAuthenticated);
allOrderRoutes.use(ensureIsAmin);

allOrderRoutes.patch("/", allOrderController.update);
allOrderRoutes.get("/", allOrderController.index);


module.exports = allOrderRoutes;