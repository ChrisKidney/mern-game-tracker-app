const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.header('X-Auth-Token')) {
        return res.status(401).send('Missing Token');
    }
    else {
        jwt.verify(req.header('X-Auth-Token'), process.env.JWT_PRIVATE_KEY, (err) => {
            if (err) return res.status(401).send('Invalid Token');
            next();
        });
    }
}