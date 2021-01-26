const express = require('express');
const job = require('../models/job');
const router = express.Router();

// Job model
const Job = require('../models/job');

// @route Get request
router.get('/',(req,res) => {
    Job.find({deadline: {$gt : Date.now()}})
    .then(job => res.json(job));
})


// @route Post request for Adding Job
router.post('/',(req,res) => {
    const newJob = new Job({
        title: req.body.title,
        salary: req.body.salary,
        maxpos: req.body.maxpos,
        deadline: req.body.deadline,
        duration: req.body.duration,
        maxapp: req.body.maxapp,
        type: req.body.type,
        rec: req.body.rec
    });
    console.log(newJob);
    
    newJob.save().then(job => res.json())
})

router.post('/search',(req,res) => {
    let user1 = req.body;
    console.log(user1);
    Job.find({ title: `${user1.title}`}, function (err, user1) {
        return res.json(user1);
    });
})

router.post('/app',(req,res) => {

    console.log(req.body);
    Job.find({ _id: req.body.id }, function (err, user1) {
        return res.json(user1);
    });
})

router.post('/getname',(req,res) => {

    Job.findOne({ _id: req.body.id }, function (err, user1) {
        return res.json(user1);
    });
})

router.post('/edit',(req,res) => {

    console.log(req.body.id);
    Job.findOneAndUpdate({ _id: req.body.id } , { 
        maxapp:req.body.maxapp,
        maxpos:req.body.maxpos,
        deadline:req.body.deadline,
     })
    .then(e => res.json(e))
    .catch(err => res.json(err));
});

router.post('/getapp',(req,res) => {

    console.log(0);
    console.log(req.body.id);
    console.log(1);
    Job.findOne({ _id: req.body.id }, function (err, user1) {
        return res.json(user1);
    });
})

//for editing number of max app
router.post('/editapp',(req,res) => {
    var curr = req.body.maxapp;
    let varr  = parseInt(req.body.ind);
   // console.log(varr);
   // console.log(curr);
    if(varr === 1)
    {
          curr++;
    }
    else
    {
        curr--;
    }
    //console.log(curr);
    Job.findOneAndUpdate({ _id: req.body.id } , { 
        maxapp:curr,
     })
    .then(e => res.json(e))
    .catch(err => res.json(err));
});

router.post('/editrating',(req,res) => {

    var curr = parseInt(req.body.rating);
    let varr  = parseInt(req.body.to_be);
    Job.findOne({ _id: req.body.id }, function (err, user1) {
        var a = user1.rating 
        var b = user1.no_rating
        var c = a*b + curr;
        var d = b + varr;
        user1.rating = c/d;
        user1.no_rating = d;
        user1.save();
        return res.json(user1);
    });

// // Profileapp.findOneAndUpdate({ rec: req.body.id } , { 
//     //     rem: parseInt(curr) 
//     //  })
//     .then(e => res.json(e))
//     .catch(err => res.json(err));
});

module.exports  = router;