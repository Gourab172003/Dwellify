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
        default: "https://images.steamusercontent.com/ugc/861732134861592890/6AF17B5C8B544ED95205C024554DBC212AD92277/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
        set: (v) => {
            return v === "" 
              ? "https://images.steamusercontent.com/ugc/861732134861592890/6AF17B5C8B544ED95205C024554DBC212AD92277/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" 
              : v;
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
