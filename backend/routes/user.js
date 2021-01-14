const express = require('express');
const router = express.Router();

// User model
const User = require('../models/user');

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
    //console.log(newUser);
    newUser.save().then(user => res.json())
})

// @route Post request for login
router.post('/login',(req,res) => {
    let user1 = req.body;
    User.find({ name: `${user1.name}`, password: `${user1.password}` }, function (err, user1) {
        return res.json(user1);
    });
})



module.exports  = router;