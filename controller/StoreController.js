const Favorite = require("../models/favorite_model.js");
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
    
    Favorite.getFavorites(favorites => {
        Home.fetchAll(registeredHomes => {
            const favoriteHomes = registeredHomes.filter(home => favorites.some(fav => fav.id === home.id));
            res.render("store/favorite-list",{favorites: favoriteHomes, 
                home: favoriteHomes,
                title: 'Favorites - StayNest', 
                activePage: 'favorites'});
        });
    });

    

    
}   

exports.postAddfavorites = (req, res, next) => {
    const homeId = req.body.homeId;
    console.log("Home ID to add to favorites:", homeId);
    Home.fetchAll(registeredHomes => {
        const home = registeredHomes.find(hm => hm.id === homeId);
        if (home) {
            Favorite.addtoFavorite(home);
        }
        res.redirect('/favorites');
    });
}

exports.postDeleteFavorite = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log("Home ID to remove from favorites:", homeId);
    Favorite.deleteFromFavorites(homeId);
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
        // Check if home is in favorites
        Favorite.getFavorites(favorites => {
            const isFavorited = favorites.some(fav => fav.id === homeId);
            res.render("store/home-detail",{home: home, 
                isFavorited: isFavorited,
                title: 'View Details - StayNest', 
                activePage: 'view-details'});
        });
    });    
}
