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
    await Listing.insertMany(cleanedData);
    console.log("Data was initialized successfully!");
    
};

initDB();
