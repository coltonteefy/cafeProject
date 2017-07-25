const app = require('express').Router();
const User = require('../mongoose-models/user.model');

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: '/../FoodApp/dist'})
});

app.get('/test', function (req, res) {
    res.send('testing this thing')
});

// posting new users to database
app.post('/user/create', function (req, res) {
    // console.log(req.body);
    // // console.log(req.headers);
    // res.send('hey booooo');
    const newUser = new User(req.body);

    newUser.save(function(err, data) {
        if (err) {
            res.status(500).json({status: 'error', message: err});
        }
        res.status(200).json({status: 'success', message: 'User was created!', data: data});
    })
});


app.get('/user/create', function (req, res) {
    User.find(req.params.username, function (err, users) {
        if(err) {
            res.send('something went wrong!');
            next();
        }
        res.status(200).json(users);
    });
});

module.exports = app;