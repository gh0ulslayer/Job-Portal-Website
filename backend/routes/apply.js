const express = require('express');
const router = express.Router();

// Apply model
const Apply = require('../models/apply');

// @route Get request
router.get('/',(req,res) => {
    Apply.find()
    .then(apply => res.json(apply));
})


// @route Post request for Adding Job
router.post('/',(req,res) => {
    const newApply = new Apply({
        jobid: req.body.jobid,
        review: req.body.review,
        rec: req.body.rec,
        app: req.body.app,
    });
    console.log(newApply);
    
    newApply.save().then(apply => res.json())
})


module.exports  = router;