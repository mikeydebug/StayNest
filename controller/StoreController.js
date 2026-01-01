const Favorite = require("../models/favorite_model.js");
const Home = require("../models/home_model.js");




// get home details
exports.getHomeDetails  = (req, res, next) => {
    Home.find().then(registeredHomes => {
        res.render("store/home-list",{registeredHomes: registeredHomes, 
            title: 'HomeList - StayNest', 
            isLoggedIn: req.session.isLoggedIn,
            activePage: 'home',
            user: req.session.user
        });
    }).catch(err => {
        console.log('Error fetching homes:', err);
    });
}   


//get bookings
exports.getbookings = (req, res, next) => {
    res.render("store/booking-list",{bookings: [], title: 'Bookings - StayNest', activePage: 'bookings', isLoggedIn: req.session.isLoggedIn, user: req.session.user});
    
}

//get favorites
exports.getfavorites = (req, res, next) => {
    //you will get only id form favorites collection and you have to fetch home details from homes collection
    Favorite.find().then(favoriteIds => {
        const homeIdList = favoriteIds.map(fav => fav.homeId);
        return Home.find({ id: { $in: homeIdList } });
    }).then(favoriteHomes => {
        res.render("store/favorite-list",{favorites: favoriteHomes, 
            title: 'My Favorites - StayNest', 
            isLoggedIn: req.session.isLoggedIn,
            activePage: 'favorites',
            user: req.session.user
        });
    }).catch(err => {
        console.log('Error fetching favorites:', err);
        res.render("store/favorite-list",{favorites: [], 
            title: 'My Favorites - StayNest', 
            isLoggedIn: req.session.isLoggedIn,
            activePage: 'favorites',
            user: req.session.user
        });
    }); 
}



exports.postAddfavorites = (req, res, next) => {
    const homeId = req.body.homeId;
    Home.findOne({ id: homeId }).then(home => {
        if (!home) {
            return res.redirect('/homes');
        }
        // Check if already in favorites
        return Favorite.findOne({ homeId: homeId }).then(existingFav => {
            if (existingFav) {
                return res.redirect('/favorites');
            }
            const newFavorite = new Favorite({ homeId: homeId });
            return newFavorite.save().then(() => {
                res.redirect('/favorites');
            });
        });
    }).catch(err => {
        console.log('Error adding to favorites:', err);
        res.redirect('/homes');
    });
}

  

exports.postDeleteFavorite = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log("Home ID to remove from favorites:", homeId);
    Favorite.deleteOne({ homeId: homeId }).then(() => {
        res.redirect('/favorites');
    }).catch(err => {
        console.log('Error deleting from favorites:', err);
        res.redirect('/favorites');
    });
}

//get index

exports.getIndex = (req, res, next) => {
    console.log("isLoggedIn value in getIndex:", req.session.isLoggedIn);
    Home.find().then(registeredHomes => {

        res.render("store/index",{registeredHomes: registeredHomes, 
            title: 'StayNest', 
            isLoggedIn: req.session.isLoggedIn,
            activePage: 'index',
            user: req.session.user
        });
    }).catch(err => {
        console.log('Error fetching homes:', err);
    });
}

//view home details
exports.getViewDetails = (req, res, next) => {
    const homeId = req.params.id;
    
    Promise.all([
        Home.findOne({ id: homeId }),
        Favorite.find()
    ]).then(([home, favorites]) => {
        if (!home) {
            return res.redirect('/homes');
        }
        
        const isFavorited = favorites.some(fav => fav.homeId === homeId);
        res.render("store/home-detail", {
            home: home,
            isFavorited: isFavorited,
            isLoggedIn: req.session.isLoggedIn,
            title: 'View Details - StayNest',
            activePage: 'view-details',
            user: req.session.user
        });
    }).catch(err => {
        console.log('Error fetching home details:', err);
        res.redirect('/homes');
    });
}
