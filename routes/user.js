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
router.get(
    "/login", (req,res)=>{
        res.render("users/login.ejs");
    }
)

// -----------------------------------------Log-in Information Verification ----------------------------------------------
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash:true,}),
    async(req,res)=>{
        req.flash("success", "Welcome back to Wanderlust");
        res.redirect(res.locals.redirectUrl || "/listings");
    }
)

// -----------------------------------------Log-out ----------------------------------------------
router.get("/logout", (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are loged out");
        res.redirect("/listings");

    })
})



module.exports = router;

