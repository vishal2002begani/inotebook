const mongoose=require("mongoose");
const mongoURI="mongodb://localhost:27017/";
const connect_mongo=async()=>{
    await mongoose.connect(mongoURI);
    console.log("dfdfd")
}
module.exports =connect_mongo;