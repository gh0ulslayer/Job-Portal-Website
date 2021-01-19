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
router.post('/',(req,res) => {
    
})

module.exports  = router;