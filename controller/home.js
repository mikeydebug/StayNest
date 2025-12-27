const Home = require("../models/home_model.js");
//import { registeredHomes } from "../model/home"; // Import the registeredHomes array
//controller/home.js
//get add home
exports.getAddHome = (req, res,next) => {
    res.render("host/add-home",{title: 'Add Home - StayNest', activePage: 'add-home'});       
}

//post add home

exports.postAddHome = (req, res,next) => {


    // const newhome = new Home(req.body.title, req.body.description, req.body.price, req.body.location, req.body.imageUrl, req.body.rating );
    // newhome.save();    
    //.       OR 

    const { title, description, price, location, imageUrl, rating } = req.body;// destructuring form body 
    const newhome = new Home(title, description, price, location, imageUrl, rating);
    newhome.save();

    // Alternatively, you can push directly to registeredHomes if needed
    //



    res.render("host/homeadded",{title: 'Home Added - StayNest', activePage: ''});
}

//no need to export registeredHomes from here becz we can access it directly in homeController
//exports.registeredHomes = registeredHomes;



// get home details
exports.getHomeDetails  = (req, res, next) => {
    const registeredHomes = Home.fetchAll(registeredHomes => {
        res.render("store/home-list",{registeredHomes: registeredHomes, 
            title: 'Home - StayNest', 
            activePage: 'home'});
    });    

}