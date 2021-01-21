const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Apply = new Schema({
    
    jobid: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rec:{
        type: String,
        required: true
    },
    app:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});


module.exports =  mongoose.model('apply' , Apply);