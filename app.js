// const express= require('express');
// const app= express();
// const flash=require("connect-flash");
// const session= require("express-session");


// const mongoose= require('mongoose');
// const Listing = require("./models/listing.js");
// const path= require("path");
// const methodOverride= require("method-override");
// app.use(methodOverride('_method'));
// const ejsMate=require("ejs-Mate");
// app.engine("ejs", ejsMate)
// const joi= require('joi');
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname,"views"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname,"public")));
// app.use(express.json());
// const passport= require("passport");
// const LocalStratergy=require("passport-local");




// const ExpressError=require("./utils/expressError.js");
// const listings= require("./routes/listing.js");
// const reviews= require("./routes/review.js");
// const userRouter= require("./routes/user.js");

// main()
// .then(()=>{
//   console.log("connection is successful");
// })

// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
// }

// const sessionOptions={
//     secret:"mysupersecret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//          expires: Date.now() + 7 *24 *60 *60 *1000,
//          maxAge: 7 *24 *60 *60 *1000,
//          httpOnly: true,
// }
// }


// const user = require("./models/user.js");


// app.use(session(sessionOptions));
// app.use(flash());


// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStratergy (user.authenticate ()));
// passport.serializeUser(user.serializeUser());
// passport.deserializeUser(user.deserializeUser());


// app.use((req,res,next)=>{
// res.locals.success= req.flash("success");
// res.locals.error = req.flash("error");
// next();
// })


// app.get("/", (req,res)=>{
//     res.send("Hey, i am the root");
// })

// //adding demo users 
// app.get("/demouser", async(req,res)=>{
//   let fakeUser= new user({
//     email: "student@gmail.com",
//     username: "delta-student",
//   });

//   let registerdUser= await user.register(fakeUser, "helloworld");
//   res.send(registerdUser);
// })

// // Accessing Routes 
// app.use("/listings", listings)
// app.use("/listings/:id/reviews", reviews);
// app.use("/", userRouter);


// app.all("*splat", (req,res,next)=>{
// next(new ExpressError(404,"Pagenot Found!"))
// })



// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong" } = err;
//   res.status(statusCode).render("listing/error.ejs", { message });
// });


// //Server Live 
// app.listen("8080", (req,res)=>{
//     console.log("The Server is working")
// });


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const ExpressError = require("./utils/expressError.js");
const Listing = require("./models/listing.js");
const User = require("./models/user.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// ─── Database ────────────────────────────────────────────────────────────────
main()
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log("DB Error:", err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

// ─── App Config ──────────────────────────────────────────────────────────────
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

// ─── Session ─────────────────────────────────────────────────────────────────
const sessionOptions = {
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
app.use(flash());

// ─── Passport ────────────────────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ─── Locals ──────────────────────────────────────────────────────────────────
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.get("/demouser", async (req, res) => {
    try {
        let fakeUser = new User({
            email: "student@gmail.com",
            username: "delta-student",
        });
        let registeredUser = await User.register(fakeUser, "helloworld");
        res.send(registeredUser);
    } catch (e) {
        res.send(e.message);
    }
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRouter);

// ─── Error Handling ──────────────────────────────────────────────────────────
// app.all(/.*/, (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found!"));
// });

 app.all("*splat", (req,res,next)=>{
next(new ExpressError(404,"Pagenot Found!"))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listing/error.ejs", { message });
});

// ─── Server ──────────────────────────────────────────────────────────────────
app.listen(8080, () => {
    console.log("Server running on port 8080");
});