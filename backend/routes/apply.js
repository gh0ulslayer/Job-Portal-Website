const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
// Apply model
const Apply = require('../models/apply');
const Job = require('../models/job');
const User = require('../models/user');

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

router.post('/rec',(req,res) => {
    console.log(req.body);
    Apply.find({ jobid: req.body.id , rec: req.body.rec }, function (err, user1) {
        console.log(user1);
        return res.json(user1);
    });
})

router.post('/getapplication',(req,res) => {

    Apply.find({ _id: req.body.id }, function (err, user1) {
        return res.json(user1);
    });
})

let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'random@gmail.com', 
        pass: 'random'
    } 
});

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
            let emmail = null
            User.findOne({_id: user1.app} , function(err,user2) {
                console.log(user2.email)
                emmail = user2.email
            })
            let mailDetails = { 
                from:'random@gmail.com', 
                to: emmail,
                subject: 'Application Accepted', 
                html: 'GG boi , you made it !!!'
            };
            mailTransporter.sendMail(mailDetails, function(err, data) { 
                if(err) { 
                    console.log('Error Occurs'); 
                } else { 
                    console.log('Email sent successfully'); 
                }}
            )
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