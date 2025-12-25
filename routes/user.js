const express = require("express");
const userRouter = express.Router();


userRouter.get("/",(req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    res.send(`<h1>Welcome to the Airbnb Clone</h1>
        <a href="/add-home">Add Home</a><br>
        
        `);

});

module.exports = userRouter;