const Listing= require("../models/listing");

module.exports.renderNewForm=(req,res)=>{
  
  res.render("listing/new.ejs");
};