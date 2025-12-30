const express = require('express');
const path = require('path');
const hostRouter = require('./routes/hostrouter');
const StoreRouter = require('./routes/StoreRouter');
const rootDir = require('./utils/pathutil');
const app = express();
const port = 3000;
const ErrorController = require('./controller/errors');


const { default: mongoose } = require('mongoose');



app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Set EJS as templating engine
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', 'views');

// Serve static files from the 'public' directory
app.use(express.static(path.join(rootDir, 'public')));
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(StoreRouter);
app.use("/host", hostRouter);


//adding 404 page 
app.use(ErrorController.get404);





const dbUrl = 'mongodb+srv://MayankSoni:mayankpass@staynest.8fo9pex.mongodb.net/StayNest?appName=StayNest';
mongoose.connect(dbUrl).then(() => {
    console.log('Connected to MongoDB using Mongoose');
    app.listen(port, () => {
        console.log(`StayNest app listening at http://localhost:${port}`);
    });

}).catch(err => {
    console.log('Error connecting to MongoDB:', err);
});