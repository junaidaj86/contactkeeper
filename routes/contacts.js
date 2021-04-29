const express = require("express");
const {check, validationResult} = require("express-validator/check");
const User = require("../models/User");
const contact = require("../models/Contact");
const router = express.Router();
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");

// @route       GET  api/contacts
// @desc        get all users contact
// @access      private
router.get("/",auth,
async (req, res)=>{
    try {
        const contacts = await contact.find({user: req.body.user.id}).sort({date:-1});
        if(!contact){
            res.status(400).json({msg:"no contacts for user"})
        }
        res.json(contacts);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:"server error"});
    }
});


// @route       POST  api/contacts/
// @desc        add contacts
// @access      private
router.post("/",[auth,
check("name", "name is required").not().isEmpty()
],
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name, email, phone, type} = req.body;

    try {
        const newContact = new Contact({
            name,email,phone,type,user:req.body.user.id
        });
        const contact = await newContact.save();
        
        return res.status(200).json(contact);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg:"server error"});
    }
    res.json({"msg":"add new contact"});
});

// @route       PUT  api/contacts/:id
// @desc        edit contacts
// @access      private
router.put("/:id",auth, async (req, res)=>{
    const {name, email, phone, type} = req.body;

    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;
    // contactFields.user = req.body.user.id;
    const updatedContact = new Contact(contactFields);
    try {
        let contacts = await Contact.findById(req.params.id);
        if(!contacts) return res.status(400).json({msg:"No contact found for the user"});

        if(contacts.user.toString() != req.body.user.id) return res.status(401).json({msg:"Not authorized"});

        let cont = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new:true});
        return res.status(200).json(cont);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg:"server error"})
    }
});

// @route       DELETE  api/contacts/:id
// @desc        delete contacts
// @access      private
router.delete("/:id",auth, async (req, res)=>{
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(400).json({msg:"Contact not found for this user"})

        if(contact.user.toString() != req.body.user.id) return res.status(400).json({msg:"Not Authorized"});

        let cont = await Contact.findByIdAndRemove(req.params.id);
        return res.status(200).json({msg:"deleted successfully"});

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({msg:"server error"});
    }
});


module.exports = router;