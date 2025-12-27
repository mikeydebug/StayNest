const express = require('express');
const path = require('path');
const Host = require('./routes/host');
const user = require('./routes/user');
const rootDir = require('./utils/pathutil');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(rootDir, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(user);
app.use("/host", Host);


//adding 404 page 
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});