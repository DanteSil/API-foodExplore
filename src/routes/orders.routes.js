const { Router } = require("express");

const OrderController = require("../controllers/OrderController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const orderController = new OrderController();

const ordersRoutes = Router();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post("/", orderController.create);
ordersRoutes.get("/:id", orderController.index);
ordersRoutes.get("/", orderController.show);

module.exports = ordersRoutes;