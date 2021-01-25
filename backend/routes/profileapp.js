const express = require('express');
const router = express.Router();

// Job model
const User = require('../models/user');
const Profileapp = require('../models/profileapp');

// @route Get request
router.get('/',(req,res) => {
    //let user1 =  req.body;
   // console.log(user1);
    Profileapp.find()
    .then(profileapp => res.json(profileapp));
})
router.post('/getrem',(req,res) => {
    console.log(req.body.id);
    Profileapp.find({ rec: req.body.id}, function (err, user1) {
        return res.json(user1);
    });
})


// @route Post request for Adding Job
router.post('/edit',(req,res) => {

    console.log(req.body.id);
    Profileapp.findOneAndUpdate({ _id: req.body.id } , { 
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        bio: req.body.bio
     })
    .then(e => res.json(e))
    .catch(err => res.json(err));
});
// @route Post request for Editing remaining count for applications
router.post('/rem',(req,res) => {

    var curr = req.body.rem;
    let varr  = parseInt(req.body.ind);
    if(varr === 1)
    {
          curr++;
    }
    else
    {
        curr--;
    }
    console.log(curr);
    Profileapp.findOne({ rec: req.body.id }, function (err, user1) {
        user1.rem = curr
        user1.save();
        return res.json(user1);
    });

// // Profileapp.findOneAndUpdate({ rec: req.body.id } , { 
//     //     rem: parseInt(curr) 
//     //  })
//     .then(e => res.json(e))
//     .catch(err => res.json(err));
});
router.post('/getrating',(req,res) => {


    Profileapp.findOne({ rec: req.body.id }, function (err, user1) {
        return res.json(user1);
    });
})


module.exports  = router;