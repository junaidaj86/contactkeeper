const express = require("express");

const router = express.Router();


const {check, validationResult} = require("express-validator/check");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

// @route       GET  api/auth
// @desc        get logged in user
// @access      private
router.get("/",auth, async(req, res)=>{
    try {
        let dbUser = await User.findById(req.body.user.id).select("-password");
        if(!dbUser){
            return res.status(400).json({msg:`user with user id ${req.body.user.id} not present`})
        }
    
        res.json({"user":dbUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"server error"})
    }
   
});


// @route       POST  api/auth
// @desc        aut user and get token
// @access      public
router.post("/",
[check("email", "email is required").isEmail(),
check("password", "password is required").isLength({min:6})],
 async (req, res)=>{

    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array})
    }

    const {email, password} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({msg: `user with email ${email} not found`})
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "invalid credentials"});
        }
        const payload ={
            user: {
                id:user.id
            }
        }
        jwt.sign(payload, config.get("jwt_secret"), {
            expiresIn: 360000
        }, (err, token)=>{
            if(err) throw err;
            res.json(token);
        });
    }catch(err){
        return res.status(500).json({msg:"server error"});
    }
})


module.exports = router;