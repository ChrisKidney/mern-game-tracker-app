/*
  Main API router, routes to sub routers (songs, users, etc.) 
*/
const express = require('express');
const router = express.Router();

const gamesRouter = require('./games');
router.use('/games', gamesRouter);

const usersRouter = require('./users');
router.use('/users', usersRouter);

router.get('/', (req, res, next) => {
  res.send('API');
});

module.exports = router;
