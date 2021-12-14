const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if (err) return res.status(400).send('Error hashing password');
        req.body.password = hash;
        next();
    });
}