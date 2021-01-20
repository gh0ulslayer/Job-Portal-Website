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
    contact: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    rec:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});


module.exports =  mongoose.model('profileapp' , Profileapp);