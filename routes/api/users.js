const express = require('express');
const router = express.Router();

const User = require('../../models/user');

const registerRouter = require('./register');
router.use('/register', registerRouter);

const loginRouter = require('./login');
router.use('/login', loginRouter);

// router.get('/', (req, res) => {
//     User.find((err, Users) => {
//         if (err) return res.status(400).send(`Error: ${err.message}`);
//         res.status(200).send(Users);
//     });
// });

// router.get('/:id', (req, res) => {
//     User.findById(req.params.id, (err, User) => {
//         if (err) return res.status(400).send(`Error: ${err.message}`);
//         if (!User) return res.status(404).send('Not Found');
//         res.status(200).send(User);
//     });
// });

// router.delete('/:id', (req, res) => {
//     User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
//         if (err) return res.status(400).send(`Error: ${err.message}`);
//         if (!deletedUser) return res.status(404).send('Not Found');
//         res.status(204).send();
//     });
// });

module.exports = router;