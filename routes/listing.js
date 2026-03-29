const express= require("express");
const router=express.Router();
const ExpressError=require("../utils/expressError.js");
const {listingSchema, reviewSchema}= require("../schema.js");
const Listing = require("../models/listing.js");



const validateListing= (req, res,next)=>{
  let result= listingSchema.validate(req.body);
  if(result.error)
  {
    console.log(err);
    throw new ExpressError(400,result.error);
    }
    else{
      next();
    }
 
}


const validateReview= (req, res,next)=>{
  let result= reviewSchema.validate(req.body);
  if(result.error)
  {
    console.log(err);
    throw new ExpressError(400,result.error);
    }
    else{
      next();
    }
 
}





//Shoiw All listings 
router.get("/", async(req,res)=>{

  const allListings= await Listing.find({});
  res.render("listing/index.ejs", {allListings});
})



//new route 
router.get("/new",  (req, res)=>{
  res.render("listing/new.ejs")
})



// show user details 
router.get("/:id", async(req, res)=> {
  let {id}= req.params;
  const listing=await Listing.findById(id).populate("reviews");
  res.render("listing/show.ejs", {listing});
})



//create new route/property
router.post("/",  async(req,res,next)=>{
  
  try{
    
 let {title,price, location,country}= req.body;
  let newChat= new Listing({
    title: title,
    price: price,
    location: location,
    country: country,
    
  });
  newChat.save()
  .then(()=>{console.log (newChat)})
  .catch((err)=>{ console.log(err)});
  res.redirect("/listings");
  }
  catch(err)
  {
    next(err);
  }
 
  
})


//Update DATA
router.put("/edit/update/:id",validateReview, async(req,res)=>{
let{id}=req.params;
let{newTitle, newDescription, newImage, newPrice, newLocation, newCountry}= req.body;
await Listing.findByIdAndUpdate(id, {
  title:newTitle,
  description:newDescription,
  image:newImage,
  price:newPrice,
  location:newLocation,
  country:newCountry,
})
res.redirect("/listings")
})


//DELETE
router.delete("/:id/del", async(req,res)=>{
  let{id}=req.params;
  await Listing.findByIdAndDelete(id);  // Remove quotes around id
  res.redirect("/listings");
})

module.exports=router;