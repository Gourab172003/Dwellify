const Listing= require("../models/listing");

module.exports.renderNewForm=(req,res)=>{
  
  res.render("listing/new.ejs");
};

 module.exports.showListings=async(req,res)=>{

  const allListings= await Listing.find({});
  res.render("listing/index.ejs", {allListings});
};