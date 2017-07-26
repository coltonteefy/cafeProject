const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/FoodApp/dist'));
app.use('/', routes);



// connect to database
mongoose.connect('mongodb://localhost:27017/upseatscustomers', function (err, db) {
    if (err){
        console.log('could not connect to the database');
        throw err;
    }
    console.log('you are connected to the database');
});

// start server
app.listen(3000, function () {
    console.log('Example app listening on port 3000')
});

module.exports = app;