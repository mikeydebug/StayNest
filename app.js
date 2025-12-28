const express = require('express');
const path = require('path');
const hostRouter = require('./routes/hostrouter');
const StoreRouter = require('./routes/StoreRouter');
const rootDir = require('./utils/pathutil');
const app = express();
const port = 3000;
const ErrorController = require('./controller/errors');



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




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});