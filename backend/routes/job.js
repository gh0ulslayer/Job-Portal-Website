const express = require('express');
const job = require('../models/job');
const router = express.Router();

// Job model
const Job = require('../models/job');

// @route Get request
router.get('/',(req,res) => {
    Job.find()
    .then(job => res.json(job));
})


// @route Post request for Adding Job
router.post('/',(req,res) => {
    const newJob = new Job({
        title: req.body.title,
        salary: req.body.salary,
        maxpos: req.body.maxpos,
        type: req.body.type,
        rec: req.body.rec
    });
    console.log(newJob);
    
    newJob.save().then(job => res.json())
})


router.post('/edit',(req,res) => {

    console.log(req.body.id);
    Job.findOneAndUpdate({ _id: req.body.id } , { 
        maxpos: req.body.maxpos,
        maxapp: req.body.maxapp
     })
    .then(e => res.json(e))
    .catch(err => res.json(err));
});

module.exports  = router;