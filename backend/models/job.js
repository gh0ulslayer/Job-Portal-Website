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
    duration: {
        type: Number,
        enum: [0,1,2,3,4,5,6],
        required: true
    },
    rating: {
        type: Number,
        default: 0,
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
    deadline: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});


module.exports =  mongoose.model('job' , Job);