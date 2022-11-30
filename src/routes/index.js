const { Router } = require("express");

const userRoutes = require("./users.routes");
const ordersRoutes = require("./orders.routes");
const allOrdersRoutes = require("./allOrders.routes");
const dishesRoutes = require("./dishes.routes");
const sessionRoutes = require("./session.routes");
const favRoutes = require("./fav.routes");

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);
routes.use("/orders", ordersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/allOrders", allOrdersRoutes);
routes.use("/fav", favRoutes);

module.exports = routes;

