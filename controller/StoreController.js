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
    res.render("store/booking-list",{bookings: [], title: 'Bookings - StayNest', activePage: 'bookings'});
    
}

//get favorites
exports.getfavorites = (req, res, next) => {
    const favorites =[{
    "title": "Luxury Penthouse Suite",
    "description": "Modern penthouse with city skyline views, rooftop terrace, and premium furnishings",
    "price": "8900",
    "location": "Mumbai",
    "imageUrl": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    "rating": "4.8",
    "id": "1735380000005"
  },
  {
    "title": "Countryside Farmhouse",
    "description": "Charming farmhouse surrounded by lush gardens and orchards, perfect for peaceful getaway",
    "price": "1950",
    "location": "Pune",
    "imageUrl": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    "rating": "4.5",
    "id": "1735380000006"
  }]; 

    

    res.render("store/favorite-list",{favorites: favorites, home : favorites,

        title: 'Favorites - StayNest', activePage: 'favorites'});
}   

exports.postAddfavorites = (req, res, next) => {
    const homeId = req.body.homeId;
    console.log("Home ID to add to favorites:", homeId);
    // Here, you would typically add logic to save the favorite to a database or session

    res.redirect('/favorites');
}

//get index

exports.getIndex = (req, res, next) => {
    const registeredHomes = Home.fetchAll(registeredHomes => {
        res.render("store/index",{registeredHomes: registeredHomes, 
            title: 'StayNest', 
            activePage: 'index'});
    });    

}

//view home details
exports.getViewDetails = (req, res, next) => {
    const homeId = req.params.id;
    Home.fetchAll(registeredHomes => {
        const home = registeredHomes.find(hm => hm.id == homeId);
        if (!home) {
            return res.redirect('/homes');
        }
        res.render("store/home-detail",{home: home, 
            title: 'View Details - StayNest', 
            activePage: 'view-details'});
    });    
}
