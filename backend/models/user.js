const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['A','R'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});


module.exports =  mongoose.model('user' , User);