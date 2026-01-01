const express = require("express");

//const rootdir = require("../utils/pathutil");

//const path = require("path");
//const { registeredHomes } = require("./host");

const StoreRouter = express.Router();

const StoreController = require("../controller/StoreController");


StoreRouter.get("/", StoreController.getIndex);
StoreRouter.get("/homes", StoreController.getHomeDetails);
StoreRouter.get("/favorites", StoreController.getfavorites);
StoreRouter.post("/favorites", StoreController.postAddfavorites);
StoreRouter.post("/favorites/delete/:homeId", StoreController.postDeleteFavorite);
StoreRouter.get("/bookings", StoreController.getbookings);
StoreRouter.post("/bookings/create", StoreController.postCreateBooking);
StoreRouter.post("/bookings/cancel/:bookingId", StoreController.postCancelBooking);
//view home details
StoreRouter.get("/homes/:id", StoreController.getViewDetails);


module.exports = StoreRouter;