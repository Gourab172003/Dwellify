const express= require('express');
const app= express();
const mongoose= require('mongoose');

const Listing = require("./models/listing.js");
const path= require("path");
const methodOverride= require("method-override");
app.use(methodOverride('_method'));
const ejsMate=require("ejs-Mate");
app.engine("ejs", ejsMate)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
const ExpressError=require("./utils/expressError.js");
const {listingSchema}= require("./schema.js");

main()
.then(()=>{
  console.log("connection is successful");
})

.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');

 
}

app.listen("8080", (req,res)=>{
    console.log("The Server is working")
});

app.get("/", (req,res)=>{
    res.send("Hey, i am the root");
})


// Inserting all data
app.get("/testListing", async(req,res)=>{
 
  let sampleListing1 = new Listing({
  title: "Sea View Villa",
  description: "Luxury villa with ocean view",
  price: 4500000,
  location: "Goa",
  country: "India",
  imaage:"https://media.istockphoto.com/id/506903162/photo/luxurious-villa-with-pool.jpg?s=612x612&w=0&k=20&c=Ek2P0DQ9nHQero4m9mdDyCVMVq3TLnXigxNPcZbgX2E="
});

let sampleListing2 = new Listing({
  title: "Hilltop Cottage",
  description: "Peaceful cottage in the hills",
  price: 2800000,
  location: "Manali",
  country: "India",
  image:"https://www.shutterstock.com/image-illustration/3d-rendering-modern-luxurious-house-260nw-2434162449.jpg"
});

let sampleListing3 = new Listing({
  title: "Royal Palace Stay",
  description: "Heritage style luxury property",
  price: 7500000,
  location: "Jaipur",
  country: "India",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAD09U8Hv-lf3EWBWnvCFKHifittXLfaRyew&s"
});

let sampleListing4 = new Listing({
  title: "Lake Side Villa",
  description: "Beautiful villa beside the lake",
  price: 5200000,
  location: "Udaipur",
  country: "India",
  image:"https://www.morairainvest.com/objetos/temp/source/morairainvest/625972/foto1.jpeg"
});

let sampleListing5 = new Listing({
  title: "Forest Retreat",
  description: "Calm home surrounded by forest",
  price: 3100000,
  location: "Coorg",
  country: "India",
  image:"https://media.vrbo.com/lodging/103000000/102350000/102343500/102343473/30f185c5.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
});

let sampleListing6 = new Listing({
  title: "Beach Resort Home",
  description: "Private property near the beach",
  price: 6800000,
  location: "Kovalam",
  country: "India",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsGGJO2OVW3bTRpjQZk9FR6YMn64e6N_tg2g&s"
});

let sampleListing7 = new Listing({
  title: "City Penthouse",
  description: "Modern penthouse in metro city",
  price: 9000000,
  location: "Mumbai",
  country: "India",
  image:"https://luxuryforsale.properties/luxury-real-estate/listings/andalusian-style-villa-in-el-herrojo-benahavis-ref-130974/"
});

let sampleListing8 = new Listing({
  title: "Tea Garden Bungalow",
  description: "Bungalow in tea estate area",
  price: 3600000,
  location: "Darjeeling",
  country: "India",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT13ukuIsj56ZN-1fq3qpJxteMCDrCQ76Le6w&s"
});

let sampleListing9 = new Listing({
  title: "River View Home",
  description: "Scenic river facing property",
  price: 4200000,
  location: "Rishikesh",
  country: "India",
  image:"https://luxuryforsale.properties/wp-content/uploads/2025/11/The-Ridge-Villa-el-Herrojo-2-300x225.jpg"
});

let sampleListing10 = new Listing({
  title: "Luxury Farmhouse",
  description: "Spacious farmhouse with garden",
  price: 5800000,
  location: "Delhi",
  country: "India",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu4XCPj5N7GXcd1xkqAsKQcj9A0kwRkWBDTg&s"
})
let sampleListing11 = new Listing({
  title: "Mountain View Resort",
  description: "Resort with panoramic mountain views",
  price: 6400000,
  location: "Shimla",
  country: "India",
    image:"https://luxuryforsale.properties/wp-content/uploads/2025/11/The-Ridge-Villa-el-Herrojo-2-300x225.jpg"
});

let sampleListing12 = new Listing({
  title: "Backwater Villa",
  description: "Luxury villa near Kerala backwaters",
  price: 5100000,
  location: "Alleppey",
  country: "India",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo5-9sJ_sJDk9C-zFgxpKrCy2Zl_CpNgMkg&s"
});

let sampleListing13 = new Listing({
  title: "Heritage Haveli",
  description: "Traditional Rajasthani style home",
  price: 4700000,
  location: "Jodhpur",
  country: "India",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu4XCPj5N7GXcd1xkqAsKQcj9A0kwRkWBDTg&s"
});

let sampleListing14 = new Listing({
  title: "Skyline Apartment",
  description: "High-rise apartment with city view",
  price: 7200000,
  location: "Bangalore",
  country: "India",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT13ukuIsj56ZN-1fq3qpJxteMCDrCQ76Le6w&s"
});

let sampleListing15 = new Listing({
  title: "Palm Tree Villa",
  description: "Tropical villa with private garden",
  price: 5600000,
  location: "Goa",
  country: "India",
  image:"https://media.vrbo.com/lodging/103000000/102350000/102343500/102343473/30f185c5.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
});



  

  
await sampleListing1.save();
await sampleListing2.save();
await sampleListing3.save();
await sampleListing4.save();
await sampleListing5.save();
await sampleListing6.save();
await sampleListing7.save();
await sampleListing8.save();
await sampleListing9.save();
await sampleListing10.save();
await sampleListing11.save();
await sampleListing12.save();
await sampleListing13.save();
await sampleListing14.save();
await sampleListing15.save();


  
  res.send("Success");
})
 
//Shoiw All listings 
app.get("/listings", async(req,res)=>{

  const allListings= await Listing.find({});
  res.render("listing/index.ejs", {allListings});
})

//new route 
app.get("/listing/new",  (req, res)=>{
  res.render("listing/new.ejs")
})

// show user details 
app.get("/listing/:id", async(req, res)=> {
  let {id}= req.params;
  const listing=await Listing.findById(id);
  res.render("listing/show.ejs", {listing});
})

//create new route/property
app.post("/listings", async(req,res,next)=>{
  
  try{
    let result= listingSchema.validate(req.body);
  if(result.error)
  {
    console.log(err);
    throw new ExpressError(400,result.error);
    
  }
  console.log(result);
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

app.get("/listings/edit/:id", (req,res)=> {
  let{id}= req.params;
  res.render("listing/edit.ejs",{id});
})

//Update DATA
app.put("/listings/edit/update/:id", async(req,res)=>{
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

// //DELETE
// app.delete("/listings/:id/del", async(req,res)=>{
//   let{id}=req.params;
//    await Listing.findByIdAndDelete(id);
//    res.redirect("/listings");
// })


//DELETE
app.delete("/listings/:id/del", async(req,res)=>{
  let{id}=req.params;
  await Listing.findByIdAndDelete(id);  // Remove quotes around id
  res.redirect("/listings");
})


// app.all("*splat", (req,res,next)=>{
// next(new ExpressError(404,"Pagenot Found!"))
// })

app.all("*splat", (req, res, next) => {
  next(new ExpressError(504, "Page not found!"));  // ✅ passing ExpressError with statusCode
});

// app.use((err,req,res,next)=> {
//   // let{statusCode, message}=err;
//   res.status(statusCode).render("listing/error.ejs", {message});
// }
// )


app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err; // ✅ fallback
  res.status(statusCode).render("listing/error.ejs", { message });
});