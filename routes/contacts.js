const express = require("express");

const router = express.Router();

// @route       GET  api/contacts
// @desc        get all users contact
// @access      private
router.get("/", (req, res)=>{
    res.json({"msg":"get contacts for logged in user"});
});


// @route       POST  api/contacts/
// @desc        add contacts
// @access      private
router.post("/", (req, res)=>{
    res.json({"msg":"add new contact"});
});

// @route       PUT  api/contacts/:id
// @desc        edit contacts
// @access      private
router.put("/:id", (req, res)=>{
    res.json({"msg":"edit contact"});
});

// @route       DELETE  api/contacts/:id
// @desc        delete contacts
// @access      private
router.delete("/:id", (req, res)=>{
    res.json({"msg":"delete contact"});
});


module.exports = router;