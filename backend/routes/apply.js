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

router.post('/state',(req,res) => {

    console.log(req.body.id , req.body.state);
    Apply.findOne({ _id: req.body.id }, function (err, user1) {
        if(req.body.state === "Applied")
        {
            user1.type = "Shortlisted"
        }
        else if(req.body.state === "Shortlisted")
        {
            user1.type = "Accepted"
        }
        else if(req.body.state === "Rejected")
        {
            user1.type = "Rejected"
        }
        user1.save();
        return res.json(user1);
    });

});

router.post('/rejectall',(req,res) => {

    console.log(req.body.id);
    Apply.find({ app: req.body.id }, function (err, user1) {
        //user1.rem = curr
        console.log(user1);
        user1.forEach(lmao);
        function lmao(item){
            item.type = "Rejected";
            item.save();
        }
        return res.json(user1);
    });
})

module.exports  = router; 