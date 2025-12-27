const express = require("express");

const rootdir = require("../utils/pathutil");

const path = require("path");

const userRouter = express.Router();


userRouter.get("/",(req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    res.sendFile(path.join(rootdir, "views", "index.html"));
});

module.exports = userRouter;