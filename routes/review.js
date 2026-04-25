const express = require("express");
// CHANGE: Added mergeParams: true to access :id from app.js
const router = express.Router({ mergeParams: true }); 
const ExpressError = require("../utils/expressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


const validateReview = (req, res, next) => {
    let result = reviewSchema.validate(req.body);
    if (result.error) {
        // FIX: Changed 'err' to 'result.error' to match the variable name
        throw new ExpressError(400, result.error);
    } else {
        next();
    }
};
const reviewControler= require("../controler/review.js");


// POST Review Route
router.post("/", validateReview,reviewControler.reviewRoute);

// DELETE Review Route
router.delete("/:reviewId", reviewControler.deleteReview );

module.exports = router;