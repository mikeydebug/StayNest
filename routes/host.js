const express = require('express');
const hostRouter = express.Router();


hostRouter.get("/add-home",(req, res,next) => {
    res.send(`<h1>Add Home Details</h1>
        
        <form action="/add-home" method="POST">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="location">Location:</label><br>
            <input type="text" id="location" name="location"><br>
            <label for="price">Price per night:</label><br>
            <input type="number" id="price" name="price"><br><br>
            <input type="submit" value="Submit">
        </form>
        `);

});

hostRouter.post('/add-home',(req, res,next) => {
    console.log('Home Details:', req.body);
    res.send(`<h1>Home Added Successfully!</h1>
        <a href="/">Go to Home</a>
        `);
});

module.exports = hostRouter;