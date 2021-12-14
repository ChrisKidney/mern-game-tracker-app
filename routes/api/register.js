const express = require('express');
const router = express.Router();
const hashPassword = require('../../middleware/hashPassword');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

router.post('/', 
    hashPassword,
    (req, res) => {
        User.create(req.body, (err, savedUser) => {
            if (err) return res.status(400).send(`Error: ${err.message}`);
            let payload = {
                email: savedUser.email,
            }
            res.set('Access-Control-Expose-Headers', 'x-auth-token');
            res.set('x-auth-token', jwt.sign(payload, process.env.JWT_PRIVATE_KEY));
            res.status(201).send({
                email: savedUser.email,
                id: savedUser._id
            });
        });
    }
);

module.exports = router;