const authController = require("../controller/authCOntroller");

const express = require("express");
const authRouter = express.Router();

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.loginValidation, authController.postLogin);

authRouter.get("/signup", authController.getSignup);
authRouter.post("/signup", authController.signupValidation, authController.postSignup);

authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;