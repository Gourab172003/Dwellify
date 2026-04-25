const Listing= require("../models/listing");


module.exports.renderNewForm=(req,res)=>{
  
  res.render("listing/new.ejs");
};


 module.exports.showListings=async(req,res)=>{

  const allListings= await Listing.find({});
  res.render("listing/index.ejs", {allListings});
};


module.exports.postListings=async (req, res, next) => {
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
};