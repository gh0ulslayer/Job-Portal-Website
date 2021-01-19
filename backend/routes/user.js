const express = require('express');
const router = express.Router();

// User model
const User = require('../models/user');
const Profilerec = require('../models/profilerec');

// @route Get request
router.get('/',(req,res) => {
    User.find()
    .then(user => res.json(user));
})

// @route Post request for register
router.post('/',(req,res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type
    });

    // const existing = User.find({ email : `${newUser.email}`});
    // if(existing)
    // return res
    //     .status(400)
    //     .json({msg: "An account with this mail already exists"});
    
    //console.log(newUser);
    
    if(newUser.type === "R")
    {
    const newProfileRec = new Profilerec;
    newProfileRec.name = newUser.name;
    newProfileRec.email = newUser.email;
    newProfileRec.contact = "not set";
    newProfileRec.bio = "not set";
    newProfileRec.rec = newUser._id;
    console.log(typeof newProfileRec.rec);
    console.log(newProfileRec);
    newProfileRec.save();
   
    }
    
    newUser.save().then(user => res.json())
})

// @route Post request for login
router.post('/login',(req,res) => {
    let user1 = req.body;
    User.find({ name: `${user1.name}`, password: `${user1.password}`, type: `${user1.type}` }, function (err, user1) {
        return res.json(user1);
    });
})


module.exports  = router;