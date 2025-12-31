const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const hostRouter = require('./routes/hostrouter');
const StoreRouter = require('./routes/StoreRouter');
const rootDir = require('./utils/pathutil');
const app = express();
const port = 3000;
const ErrorController = require('./controller/errors');

const session = require('express-session');
const { default: mongoose } = require('mongoose');
const authRouter = require('./routes/authrouter');
const mongodbSession = require('connect-mongodb-session')(session);


const dbUrl = 'mongodb+srv://MayankSoni:mayankpass@staynest.8fo9pex.mongodb.net/StayNest?appName=StayNest';


app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Set EJS as templating engine
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', 'views');


const store = new mongodbSession({
    uri: dbUrl,
    collection: 'sessions'
});

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware for session management
app.use(session({
    secret: 'mysec',
    resave: false,
    saveUninitialized: true
    ,store: store
}));









// Routes
app.use(authRouter);
app.use(StoreRouter);

// Authentication middleware for host routes
app.use('/host', (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
});

// Host routes
app.use("/host", hostRouter);


//adding 404 page 
app.use(ErrorController.get404);






mongoose.connect(dbUrl).then(() => {
    console.log('Connected to MongoDB using Mongoose');
    app.listen(port, () => {
        console.log(`StayNest app listening at http://localhost:${port}`);
    });

}).catch(err => {
    console.log('Error connecting to MongoDB:', err);
});