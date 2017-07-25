const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String, // passport should hash this for security, but ok for now
});

//User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);

module.exports.getUserById =  function(id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername =  function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
};