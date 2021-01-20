const express = require('express');
const router = express.Router();

// Job model
const User = require('../models/user');
const Profilerec = require('../models/profilerec');

// @route Get request
router.get('/',(req,res) => {
    //let user1 =  req.body;
   // console.log(user1);
    Profilerec.find()
    .then(profilerec => res.json(profilerec));
})


// @route Post request for Adding Job
router.post('/edit',(req,res) => {

    console.log(req.body.id);
    Profilerec.findOneAndUpdate({ _id: req.body.id } , { 
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        bio: req.body.bio
     })
    .then(e => res.json(e))
    .catch(err => res.json(err));
});

module.exports  = router;