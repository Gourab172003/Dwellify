const express= require("express");
const router=express.Router();
const ExpressError=require("../utils/expressError.js");
const {listingSchema}= require("../schema.js");
const Listing = require("../models/listing.js");
const {isLogedin}= require("../middleware.js");
const listingController= require("../controlers/listing.js");



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
router.get("/", async(req,res)=>{

  const allListings= await Listing.find({});
  res.render("listing/index.ejs", {allListings});
})




//new Property form
router.get("/new", isLogedin, listingController.renderNewForm);




// Create route: POST /listings
router.post("/new/sub",validateListing,async (req, res, next) => {
  try {
    // Extract ALL fields from req.body
    let { title, description, image, price, location, country } = req.body.listing;
    
    const newListing = new Listing({
      title,
      description,
      image,
      price,
      location,
      country,
    });

    await newListing.save();
    console.log("New listing saved:", newListing);
    req.flash("success", "New Listing created!");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

//edit listings 
router.get("/edit/:id",isLogedin, (req,res)=> {
  let{id}= req.params;
  res.render("listing/edit.ejs",{id});
}) 

router.put("/edit/update/:id",  async (req, res) => {
  let { id } = req.params;
  let { newTitle, newDescription, newImage, newPrice, newLocation, newCountry } = req.body.Listing; 
  
  await Listing.findByIdAndUpdate(id, {
    title: newTitle,
    description: newDescription,
    image: newImage,
    price: newPrice,
    location: newLocation,
    country: newCountry,
  });
  
  res.redirect("/listings");
});


//DELETE
router.delete("/:id/del", isLogedin,async(req,res)=>{
  let{id}=req.params;
  await Listing.findByIdAndDelete(id);  // Remove quotes around id
  res.redirect("/listings");
})



// show user details 
router.get("/:id", async(req, res)=> {
  let {id}= req.params;
  const listing=await Listing.findById(id).populate("reviews");
  res.render("listing/show.ejs", {listing});
})


module.exports=router;

