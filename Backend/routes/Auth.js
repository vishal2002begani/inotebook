const express = require("express");
const User = require("../models/Users")
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');
var fetchuser=require("../middleware/fetchuser");
const jwt_secret="asdfghjkl"
const router = express.Router();
const { query, validationResult, body } = require('express-validator');

router.post("/createuser", [body('name').isLength({ min: 3 }), body('email').isEmail(),
body('password', 'maja nhi aaya').isLength({ min: 6 })], async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });}
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return resp.status(400).json({ error: "bhaiya new mail dalo" });
        }
        const salt=await bcrypt.genSalt(10);
        const secpass=await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name, 
            email: req.body.email,
            password:secpass
        })
        const data={
            user:{id:user.id}
        }
        const auth_token=jwt.sign(data,jwt_secret);
        resp.json({auth_token})
    } catch (error) {
        console.error(error.message);
        resp.status(500).send("some error occured");
    }
})
// authentication 
router.post("/login", [ body('email','enter valid email').isEmail(),
body('password', 'cannot be blank').exists()], async (req, resp) => {
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user)
        {
            return resp.status(400).json({error:"user doesnot exist "})
        }
        const passwordcompare=await bcrypt.compare(password,user.password);
        if(!passwordcompare)
        {
            return resp.ststus(400).json({error:"wrong credentials given"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const auth_token=jwt.sign(data,jwt_secret);
        resp.json({auth_token})
    } catch (error) {
        console.error(error.message);
        resp.status(500).send("some error ocurred");
    }
})

// 3

router.post('/getuser',fetchuser,async(req,resp)=>{
    try {
        const userid=req.user.id;
        const user=await User.findById(userid).select("-password");
        resp.send(user)
    } catch (error) {
        console.error(error.message);
        resp.status(500).send("enternal error occured");
    }
})
module.exports = router;

