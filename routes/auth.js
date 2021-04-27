const express = require("express");

const router = express.Router();

// @route       GET  api/auth
// @desc        get logged in user
// @access      private
router.get("/", (req, res)=>{
    res.json({"msg":"get logged in user"});
});


// @route       POST  api/auth
// @desc        aut user and get token
// @access      public
router.post("/", (req, res)=>{
    res.json({"msg":"auth user"});
})


module.exports = router;