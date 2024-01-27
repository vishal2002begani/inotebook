const express=require("express");
const user=require("../models/Users")
const router=express.Router();

router.get("/",(req,resp)=>{
    console.log(req.body);
    const user=user(req.body);
    user.save();
    // resp.send(req.body);
})
module.exports=router;