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
    
    newApply.save().then(apply => res.json())
})

router.post('/app',(req,res) => {

    Apply.find({ app: req.body.id }, function (err, user1) {
        return res.json(user1);
    });
})


module.exports  = router;