const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Using the same local DB URL as your app.js
const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("DB Error:", err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    // image field in your ListingSchema is a plain String,
    // so we extract the url from the data.js image object
    const cleanedData = initData.data.map((obj) => ({
        title: obj.title,
        description: obj.description,
        image: obj.image.url,   // ← your schema stores image as String, not object
        price: obj.price,
        location: obj.location,
        country: obj.country,
    }));

    await Listing.insertMany(cleanedData);
    console.log("Data was initialized successfully!");
    mongoose.connection.close(); // close connection after seeding
};

initDB();
