const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner:'66d45794d3f43111c1071144'})); //esse sab me owner id add ho jayega 
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();