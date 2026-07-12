const express = require("express");

//const rootdir = require("../utils/pathutil");

//const path = require("path");
//const { registeredHomes } = require("./host");

const StoreRouter = express.Router();

const StoreController = require("../controller/StoreController");
const isAuth = require("../middleware/isAuth");

StoreRouter.get("/", StoreController.getIndex);
StoreRouter.get("/homes", StoreController.getHomeDetails);
StoreRouter.get("/favorites", isAuth, StoreController.getfavorites);
StoreRouter.post("/favorites", isAuth, StoreController.postAddfavorites);
StoreRouter.post("/favorites/delete/:homeId", isAuth, StoreController.postDeleteFavorite);
StoreRouter.get("/bookings", isAuth, StoreController.getbookings);
StoreRouter.post("/bookings/create", isAuth, StoreController.postCreateBooking);
StoreRouter.post("/bookings/cancel/:bookingId", isAuth, StoreController.postCancelBooking);
//view home details
StoreRouter.get("/homes/:id", StoreController.getViewDetails);


module.exports = StoreRouter;