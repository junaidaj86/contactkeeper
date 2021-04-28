const express = require("express");
const {check, validationResult} = require("express-validator/check");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config")

const router = express.Router();

// @route       POST  api/users
// @desc        register a user
// @access      public
router.post("/", [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({min:6})
    ], async (req, res)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({"errors": errors.array()});
        }else{
            const {name, email, password} = req.body;
            try{
                let user = await User.findOne({email: email});
                if(user){
                    return res.status(400).json({msg: "user already exists"});
                }
                user = new User({
                    name,email,password
                });
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                await user.save();
                const payload ={
                    user: {
                        id:user.id
                    }
                }
                jwt.sign(payload, config.get("jwt_secret"), {
                    expiresIn: 360000
                }, (err, token)=>{
                    if(err) throw err;
                    res.status(200).json(token);
                });
            }catch(err){
                console.log(err.message);
                return res.status(500).send({err: "server error"});
            }
        }
   
})


module.exports = router;