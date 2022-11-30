const { Router } = require("express");

const OrderController = require("../controllers/OrderController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const orderController = new OrderController();

const ordersRoutes = Router();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post("/", orderController.create);
ordersRoutes.get("/", orderController.index);
ordersRoutes.get("/:id", orderController.show);

module.exports = ordersRoutes;