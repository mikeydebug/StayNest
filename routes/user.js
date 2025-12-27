const express = require("express");

//const rootdir = require("../utils/pathutil");

//const path = require("path");
//const { registeredHomes } = require("./host");

const userRouter = express.Router();

const homeController = require("../controller/home");


userRouter.get("/", homeController.getHomeDetails);

module.exports = userRouter;