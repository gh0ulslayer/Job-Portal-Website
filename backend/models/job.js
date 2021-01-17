const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Job = new Schema({
    title: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    maxpos: {
        type: Number,
        required: true
    },
    maxapp: {
        type: Number,
        required: true
    },
     
    rec: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['F','P','W'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});


module.exports =  mongoose.model('job' , Job);