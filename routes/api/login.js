const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validate = require('../../middleware/validateLoginCredentials');
const User = require('../../models/user');

router.post('/', 
    validate,
    (req, res) => {
        User.findOne({ email: req.body.email }, (err, foundUser) => {
            if (err) return res.status(400).send(`Error: ${err.message}`);            
            if (!foundUser) return res.status(404).send(`Error: Not Found`);

            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                let payload = {
                    email: foundUser.email,
                }
                res.set('Access-Control-Expose-Headers', 'x-auth-token');
                res.set('x-auth-token', jwt.sign(payload, process.env.JWT_PRIVATE_KEY));
                res.status(200).send();
            }
            else {
                res.status(403).send('Error: Password did not match.');
            }
        });
    }
);

module.exports = router;