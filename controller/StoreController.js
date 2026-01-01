
const Home = require("../models/home_model.js");
const User = require("../models/user_auth.js");




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
exports.getfavorites = async (req, res, next) => {

    const userid = req.session.user._id;
    const user = await User.findById(userid).populate('favourites');
    res.render("store/favorite-list",{favorites: user.favourites, title: 'Favorites - StayNest', activePage: 'favorites', isLoggedIn: req.session.isLoggedIn,  user: req.session.user});

}



exports.postAddfavorites = async (req, res, next) => {
    const homeId = req.body.homeId;
    const userid = req.session.user._id;

    try {
        // Find the home by custom id field to get MongoDB _id
        const home = await Home.findOne({ id: homeId });
        if (!home) {
            return res.redirect('/favorites');
        }

        const user = await User.findById(userid);
        if (!user.favourites.includes(home._id)) {
            user.favourites.push(home._id);
            await user.save();
        }
        res.redirect('/favorites');
    } catch (err) {
        console.log('Error adding to favorites:', err);
        res.redirect('/favorites');
    }
}

  

exports.postDeleteFavorite = async (req, res, next) => {
    const homeId = req.params.homeId;
    const userid = req.session.user._id;
    
    try {
        // Find the home by custom id field to get MongoDB _id
        const home = await Home.findOne({ id: homeId });
        if (!home) {
            return res.redirect('/favorites');
        }

        const user = await User.findById(userid);
        user.favourites = user.favourites.filter(favId => favId.toString() !== home._id.toString());
        await user.save();
        res.redirect('/favorites');
    } catch (err) {
        console.log('Error deleting from favorites:', err);
        res.redirect('/favorites');
    }
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
exports.getViewDetails = async (req, res, next) => {
    const homeId = req.params.id;
    try {
        const home = await Home.findOne({ id: homeId });
        if (!home) {
            return res.redirect('/');
        }

        let isFavorited = false;
        if (req.session.isLoggedIn && req.session.user) {
            const user = await User.findById(req.session.user._id);
            if (user && user.favourites) {
                isFavorited = user.favourites.some(favId => favId.toString() === home._id.toString());
            }
        }

        res.render("store/home-detail", {
            home: home,
            homeId: homeId,
            title: 'Home Details - StayNest',
            activePage: 'index',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user,
            isFavorited: isFavorited
        });
    } catch (err) {
        console.log('Error fetching home details:', err);
        res.redirect('/');
    }
}
