const express= require("express");
const router=express.Router();
const ExpressError=require("../utils/expressError.js");
const {listingSchema}= require("../schema.js");
const Listing = require("../models/listing.js");
const {isLogedin}= require("../middleware.js");
const listingController= require("../controler/listing.js");



const validateListing = (req, res, next) => {
  let result = listingSchema.validate(req.body);
  if (result.error) {
    console.log(result.error);  // ✅ correct variable
    throw new ExpressError(400, result.error);
  } else {
    next();
  }
}


//Shoiw All listings 
router.get("/", listingController.showListings);




//new Property form
router.get("/new", isLogedin, listingController.renderNewForm);




// Create route: POST /listings
router.post("/new/sub",validateListing,listingController.postListings);

//edit listings 
router.get("/edit/:id",isLogedin,listingController.editListings ) 


//put edited listings
router.put("/edit/update/:id",listingController.putEditListings);


//DELETE
router.delete("/:id/del", isLogedin,listingController.deleteRoute);



// show user details 
router.get("/:id", listingController.showUser);


module.exports=router;

