const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = (req, res, next) => {
    req.body.first_name = 'blank';
    req.body.last_name = 'blank';

    let login = new User();

    login.first_name = req.body.first_name;
    login.last_name = req.body.last_name;
    login.email = req.body.email;
    login.password = req.body.password;

    login.validate((err)=>{
        if (err && err.errors['email'].kind != 'unique') return res.status(400).send(`Validation Error: ${err.message}`);
        next();
    })
}