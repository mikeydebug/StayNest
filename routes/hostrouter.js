const express = require('express');

//const rootdir = require('../utils/pathutil');

//const path = require('path');
//const { title } = require('process');

const hostRouter = express.Router();
const hostController = require('../controller/hostController');


hostRouter.get("/add-home", hostController.getAddHome); 

hostRouter.post('/add-home', hostController.postAddHome); 

//host home details
hostRouter.get("/host-home-list", hostController.gethosthomelist);

//edit home
hostRouter.get("/edit-home/:id", hostController.getEditHome);

hostRouter.post("/edit-home/:id", hostController.postEditHome);

//delete home
hostRouter.post("/delete-home/:id", hostController.deleteHome);

module.exports = hostRouter;
