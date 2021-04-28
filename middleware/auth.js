const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function(req, res,next){
    const token = req.header("x-auth-token");

    //check if not token
    if(!token){
        res.status(401).json({msg:"no token authorization present"});
    }else{
        try{
            const decode = await jwt.verify(token, config.get("jwt_secret"));
            req.body.user = decode.user;
            next();
        }catch(err){
            console.log(err)
            res.status(401).json({msg:"Token is not valid"});
        }
    }
}