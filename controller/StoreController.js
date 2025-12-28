const Home = require("../models/home_model.js");




// get home details
exports.getHomeDetails  = (req, res, next) => {
    const registeredHomes = Home.fetchAll(registeredHomes => {
        res.render("store/home-list",{registeredHomes: registeredHomes, 
            title: 'HomeList - StayNest', 
            activePage: 'home'});
    });    

}

//get bookings
exports.getbookings = (req, res, next) => {
    res.render("store/bookings",{title: 'Bookings - StayNest', activePage: 'bookings'});
}

//get favorites
exports.getfavorites = (req, res, next) => {
    res.render("store/favorite-list",{title: 'Favorites - StayNest', activePage: 'favorites'});
}   

//get index

exports.getIndex = (req, res, next) => {
    const registeredHomes = Home.fetchAll(registeredHomes => {
        res.render("store/index",{registeredHomes: registeredHomes, 
            title: 'StayNest', 
            activePage: 'index'});
    });    

}
