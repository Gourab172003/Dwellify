const express = require("express");
const router = express.Router({ mergeParams: true });
const { saveRedirectUrl }= require ("../middleware.js");
const User = require("../models/user.js"); 
const passport=require("passport");
const userControler= require("../controler/users.js");




// -----------------------------------------Signup get form ----------------------------------------------

router.get("/signup",userControler.renderSignup
);
// -----------------------------------------Signup infoormation post ----------------------------------------------
router.post("/signup",userControler.signup);

// -----------------------------------------Log-in get form  ----------------------------------------------
router.get("/login",userControler.renderLogin);

// -----------------------------------------Log-in Information Verification ----------------------------------------------
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash:true,}),userControler.Login
    
)

// -----------------------------------------Log-out ----------------------------------------------
router.get("/logout",userControler.Logout );



module.exports = router;

