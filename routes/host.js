const express = require('express');

const rootdir = require('../utils/pathutil');

const path = require('path');
const hostRouter = express.Router();


hostRouter.get("/add-home",(req, res,next) => {
    res.sendFile(path.join(rootdir, "views", "add-home.html"));       
}); 


hostRouter.post('/add-home',(req, res,next) => {
    console.log('Home Details:', req.body);
    res.sendFile(path.join(rootdir, "views", "homeadded.html"));
}); 
        


module.exports = hostRouter;