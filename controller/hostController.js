const Home = require("../models/home_model.js");
const Favorite = require("../models/favorite_model.js");
//import { registeredHomes } from "../model/home"; // Import the registeredHomes array
//controller/home.js
//get add home
exports.getAddHome = (req, res,next) => {
    res.render("host/add-home",{title: 'Add Home - StayNest', activePage: 'add-home'});       
}

//post add home

exports.postAddHome = (req, res, next) => {
    const { id, title, description, price, location, imageUrl, rating } = req.body;
    
    // Check if ID already exists
    Home.fetchAll(existingHomes => {
        const idExists = existingHomes.some(home => home.id === id);
        
        if (idExists) {
            // ID already exists - send back error
            return res.render("host/add-home", {
                title: 'Add Home - StayNest', 
                activePage: 'add-home',
                error: `Property ID "${id}" already exists. Please use a different ID.`
            });
        }
        
        // Create new home with user-provided ID
        const newhome = new Home(title, description, price, location, imageUrl, rating, id);
        newhome.save();

        res.render("host/homeadded", {
            title: 'Home Added - StayNest', 
            activePage: ''
        });
    });
}

//no need to export registeredHomes from here becz we can access it directly in homeController
//exports.registeredHomes = registeredHomes;


//host home details
exports.gethosthomelist  = (req, res, next) => {
    Home.fetchAll(hostHomes => {
        res.render("host/host-home-list",{hostHomes: hostHomes, 
            title: 'My Listings - StayNest', 
            activePage: 'host-home-list'});
    });    

}

//get edit home
exports.getEditHome = (req, res, next) => {
    const homeId = req.params.id;
    Home.fetchAll(hostHomes => {
        const home = hostHomes.find(h => h.id === homeId);
        if (!home) {
            return res.redirect('/host/host-home-list');
        }
        res.render("host/edit-home", {
            home: home,
            homeId: homeId,
            title: 'Edit Home - StayNest',
            activePage: 'host-home-list'
        });
    });
}

//post edit home
exports.postEditHome = (req, res, next) => {
    const homeId = req.params.id;
    const { title, description, price, location, imageUrl, rating } = req.body;
    
    Home.fetchAll(hostHomes => {
        const homeIndex = hostHomes.findIndex(h => h.id === homeId);
        if (homeIndex !== -1) {
            hostHomes[homeIndex] = { id: homeId, title, description, price, location, imageUrl, rating };
            const fs = require('fs');
            const path = require('path');
            const rootDir = require('../utils/pathutil');
            const homeDataPath = path.join(rootDir, 'data', 'homes_data.json');
            
            fs.writeFile(homeDataPath, JSON.stringify(hostHomes, null, 2), (err) => {
                if (err) {
                    console.log('Error writing file', err);
                }
                res.redirect('/host/host-home-list');
            });
        } else {
            res.redirect('/host/host-home-list');
        }
    });
}

//delete home
exports.deleteHome = (req, res, next) => {
    const homeId = req.params.id;
    
    Home.fetchAll(hostHomes => {
        const homeIndex = hostHomes.findIndex(h => h.id === homeId);
        if (homeIndex !== -1) {
            hostHomes.splice(homeIndex, 1);
            const fs = require('fs');
            const path = require('path');
            const rootDir = require('../utils/pathutil');
            const homeDataPath = path.join(rootDir, 'data', 'homes_data.json');
            
            fs.writeFile(homeDataPath, JSON.stringify(hostHomes, null, 2), (err) => {
                if (err) {
                    console.log('Error writing file', err);
                }
                // Also remove from favorites
                Favorite.deleteFromFavorites(homeId);
                res.json({ success: true });
            });
        } else {
            res.json({ success: false });
        }
    });
}