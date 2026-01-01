
const Home = require("../models/home_model.js");
const User = require("../models/user_auth.js");
const Booking = require("../models/booking_model.js");




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
exports.getbookings = async (req, res, next) => {
    try {
        const userid = req.session.user._id;
        const bookings = await Booking.find({ userId: userid })
            .populate('homeId')
            .sort({ bookingDate: -1 });
        
        res.render("store/bookings", {
            bookings: bookings,
            title: 'Bookings - StayNest',
            activePage: 'bookings',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });
    } catch (err) {
        console.log('Error fetching bookings:', err);
        res.render("store/bookings", {
            bookings: [],
            title: 'Bookings - StayNest',
            activePage: 'bookings',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });
    }
}

// Create booking
exports.postCreateBooking = async (req, res, next) => {
    try {
        const { homeId, checkIn, checkOut, guests } = req.body;
        const userid = req.session.user._id;

        // Find home by custom id field
        const home = await Home.findOne({ id: homeId });
        if (!home) {
            return res.redirect('/homes');
        }

        // Calculate total price (number of nights * price per night)
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * home.price;

        // Create new booking
        const newBooking = new Booking({
            homeId: home._id,
            userId: userid,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests: guests,
            totalPrice: totalPrice
        });

        await newBooking.save();
        res.redirect('/bookings');
    } catch (err) {
        console.log('Error creating booking:', err);
        res.redirect('/homes');
    }
}

// Cancel booking
exports.postCancelBooking = async (req, res, next) => {
    try {
        const bookingId = req.params.bookingId;
        const userid = req.session.user._id;

        // Find and update booking status
        await Booking.findOneAndUpdate(
            { _id: bookingId, userId: userid },
            { status: 'cancelled' }
        );

        res.redirect('/bookings');
    } catch (err) {
        console.log('Error cancelling booking:', err);
        res.redirect('/bookings');
    }
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
