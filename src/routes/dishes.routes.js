const { Router } = require("express");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const ensureIsAmin = require("../middlewares/ensureIsAmin")

const multer = require("multer");
const uploadConfig = require("../config/upload");
const upload = multer(uploadConfig.MULTER);

const dishesRoutes = Router();

const dishesController = new DishesController();


dishesRoutes.post("/", ensureAuthenticated, ensureIsAmin, upload.single("dishImg"), dishesController.create);
dishesRoutes.put("/:id", ensureAuthenticated, ensureIsAmin, upload.single("dishImg"), dishesController.update);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.delete("/:id",ensureAuthenticated, ensureIsAmin, dishesController.delete);



module.exports = dishesRoutes;