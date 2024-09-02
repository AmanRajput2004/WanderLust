const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSignUpForm)
.post(WrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLogInForm)
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true,}) ,userController.login);


router.get("/logout",userController.logOut);
module.exports = router;