const express = require('express');
const user = require('../models/user');
const router = express.Router();

// User model
const User = require('../models/user');

// @route Get request
router.get('/',(req,res) => {
    User.find()
    .then(user => res.json(user));
})

// @route Post request
router.post('/',(req,res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type
    });
    console.log(newUser);
    newUser.save().then(user => res.json())
})


module.exports  = router;