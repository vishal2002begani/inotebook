const mongoose =require("mongoose");
const notesschema=new Schema({
    title:{type:string,required:true},
    desc:{type:string,required:true},
    tag:{type:string,tag:general},
    date:{type:Date,default:Date.now}
})
module.exports=momgoose.model('notes',notesschema)