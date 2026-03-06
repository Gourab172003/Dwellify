const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/a-body-of-water-surrounded-by-forest-under-a-cloudy-sky-r8ZG4Tg_sj0",
        set: (v) => {
            return v === "" 
              ? "https://unsplash.com/photos/a-body-of-water-surrounded-by-forest-under-a-cloudy-sky-r8ZG4Tg_sj0" 
              : v;
        }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
