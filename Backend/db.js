const mongoose=require("mongoose");
const mongoURI="mongodb://localhost:27017/inotebook";
const connect_mongo=()=>{
     mongoose.connect(mongoURI).catch(error => console.log("panga"));;
    console.log("connected to mongodb ")
}
module.exports =connect_mongo;
