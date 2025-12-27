
//controller/home.js
//get add home
exports.getAddHome = (req, res,next) => {
    res.render("add-home",{title: 'Add Home - StayNest', activePage: 'add-home'});       
}

//post add home
const registeredHomes = [];
exports.postAddHome = (req, res,next) => {
    console.log('Home Details:', req.body);
    registeredHomes.push({title: req.body.title, description: req.body.description, price: req.body.price , location: req.body.location, imageUrl: req.body.imageUrl, rating: req.body.rating || 4.5});
    res.render("homeadded",{title: 'Home Added - StayNest', activePage: ''});
}

//no need to export registeredHomes from here becz we can access it directly in homeController
//exports.registeredHomes = registeredHomes;


// get home details
exports.getHomeDetails  = (req, res, next) => {

    console.log('Registered Homes:',registeredHomes);
    // Render the home view and pass the registeredHomes array to it
    res.render("home",{registeredHomes: registeredHomes, title: 'Home - StayNest', activePage: 'home'});
    

}