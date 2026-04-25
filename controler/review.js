const Listing = require("../models/listing.js");
const Review= require("../models/review.js");
module.exports.reviewRoute=async (req, res) => {
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
};

module.exports.deleteReview=async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
};