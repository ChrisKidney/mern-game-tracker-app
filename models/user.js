const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        maxlength: 100,
        required: [true, 'Must have a value for first_name.']
    },
    last_name: {
        type: String,
        maxlength: 100,
        required: [true, 'Must have a value for last_name.']
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Must have a valid email for email.'],
        unique: true,
        required: [true, 'Must have a value for email.']
    },
    password: {
        type: String,
        maxlength: 255,
        required: [true, 'Must have a value for password.']
    },
});

userSchema.plugin(uniqueValidator, { message: 'Expected {PATH} to be unique.' });

module.exports = mongoose.model('User', userSchema);