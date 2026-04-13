const express = require("express");
// CHANGE: Added mergeParams: true to access :id from app.js
const router = express.Router({ mergeParams: true }); 

router.get("/signup", (req,res)=>{
    res.send("form");
})

module.exports=router;