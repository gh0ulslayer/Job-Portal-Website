const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Profileapp = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    education: {
        type: [],
        required: true
    },
    rec:{
        type: String,
        required: true
    },
    rem:{
        type: Number,
        default: 10
    },
    rating:{
        type: Number,
        default: 0
    },
    no_rating:{
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});


module.exports =  mongoose.model('profileapp' , Profileapp);