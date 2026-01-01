const Home = require("../models/home_model.js");
const Favorite = require("../models/favorite_model.js");
//import { registeredHomes } from "../model/home"; // Import the registeredHomes array
//controller/home.js


//get add home
exports.getAddHome = (req, res,next) => {
    res.render("host/add-home",{title: 'Add Home - StayNest', activePage: 'add-home', isLoggedIn: req.session.isLoggedIn, user: req.session.user});       
}

//post add home

exports.postAddHome = (req, res, next) => {
    const { id, title, description, price, location, rating } = req.body;
    
    // Check if file was uploaded
    if (!req.file) {
        console.log('No image file uploaded');
        return res.render('host/add-home', {
            title: 'Add Home - StayNest',
            activePage: 'add-home',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user,
            error: 'Please upload an image for the property'
        });
    }
    
    // Get the uploaded file path (relative to project root)
    const imageUrl = req.file.path;
    
    // Check if ID already exists
    Home.findOne({ id: id }).then(existingHome => {
        if (existingHome) {
            // ID already exists, handle the error (e.g., redirect back with a message)
            console.log('Home ID already exists. Please choose a different ID.');
            return res.render('host/add-home', {
                title: 'Add Home - StayNest',
                activePage: 'add-home',
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user,
                error: 'Home ID already exists. Please choose a different ID.'
            });
        }
        // Create new home with uploaded image path
        const newhome = new Home({ id, title, description, price, location, image: req.file.path, rating });

        //handel promise returned by save method
        return newhome.save().then(() => {
            console.log('New home added with ID:', id);
            res.redirect('/host/host-home-list');
        });
    }).catch(err => {
        console.log('Error adding home:', err);
        res.redirect('/host/add-home');
    });

}

//no need to export registeredHomes from here becz we can access it directly in homeController
//exports.registeredHomes = registeredHomes;


//host home details
exports.gethosthomelist  = (req, res, next) => {
    Home.find().then(hostHomes => {
        res.render("host/host-home-list",{hostHomes: hostHomes, 
            title: 'My Listings - StayNest', 
            activePage: 'host-home-list',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });

    }).catch(err => {
        console.log('Error fetching homes:', err);
    });
}

//get edit home
exports.getEditHome = (req, res, next) => {
    const homeId = req.params.id;
    Home.findOne({ id: homeId }).then(home => {
        if (!home) {
            return res.redirect('/host/host-home-list');
        }
        res.render("host/edit-home", {
            home: home,
            homeId: homeId,
            title: 'Edit Home - StayNest',
            activePage: 'host-home-list',
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });
    }).catch(err => {
        console.log('Error fetching home:', err);
        res.redirect('/host/host-home-list');
    });
}

//post edit home
exports.postEditHome = (req, res, next) => {
    const homeId = req.params.id;
    const { title, description, price, location, rating } = req.body;

    // Create update object with form data
    const updateData = { title, description, price, location, rating };
    
    // If new image was uploaded, add it to update data
    if (req.file) {
        updateData.image = req.file.path;
    }

    Home.findOneAndUpdate(
        { id: homeId },
        updateData,
        { new: true }
    ).then(home => {
        if (!home) {
            return res.redirect('/host/host-home-list');
        }
        res.redirect('/host/host-home-list');
    }).catch(err => {
        console.log('Error editing home:', err);
        res.redirect('/host/host-home-list');
    });
}

//delete home
exports.postdeleteHome = (req, res, next) => {
    const homeId = req.params.id;
    Home.deleteOne({ id: homeId }).then(() => {
        // Also remove from favorites
        return Favorite.deleteMany({ homeId: homeId });
    }).then(() => {
        res.redirect('/host/host-home-list');
    }).catch(err => {
        console.log('Error deleting home:', err);
        res.redirect('/host/host-home-list');
    });
}