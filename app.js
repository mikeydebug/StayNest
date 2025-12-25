const express = require('express');
const Host = require('./routes/host');
const user = require('./routes/user');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(user);
app.use(Host);


//adding 404 page 




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});