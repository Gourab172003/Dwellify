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

// POST Review Route
router.post("/", validateReview, async (req, res) => {
    // req.params.id is now available thanks to mergeParams
    let listing = await Listing.findById(req.params.id);
    
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    
    console.log("new Review saved");
    res.redirect(`/listings/${listing._id}`);
});

// DELETE Review Route
router.delete("/:reviewId", async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
});

module.exports = router;