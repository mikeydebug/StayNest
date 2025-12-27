const express = require('express');

//const rootdir = require('../utils/pathutil');

//const path = require('path');
//const { title } = require('process');

const hostRouter = express.Router();
const homeController = require('../controller/home');


hostRouter.get("/add-home", homeController.getAddHome); 



hostRouter.post('/add-home', homeController.postAddHome); 
        

exports.hostRouter = hostRouter;
