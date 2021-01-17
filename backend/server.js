const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app  = express();
const DB_NAME =  "basic";
const PORT = 5000;

const user = require('./routes/user');
const job = require('./routes/job');


//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})


// APIs
app.use('/user' ,user);
app.use('/job' ,job);



app.get('/', function(req, res){
    res.send('Working completely fine till here...');
})


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});