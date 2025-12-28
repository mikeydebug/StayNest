const express = require("express");

//const rootdir = require("../utils/pathutil");

//const path = require("path");
//const { registeredHomes } = require("./host");

const StoreRouter = express.Router();

const StoreController = require("../controller/StoreController");


StoreRouter.get("/", StoreController.getIndex);
StoreRouter.get("/homes", StoreController.getHomeDetails);
StoreRouter.get("/favorites", StoreController.getfavorites);
StoreRouter.get("/bookings", StoreController.getbookings);


module.exports = StoreRouter;