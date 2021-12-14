const express = require('express');
const router = express.Router();

const validateToken = require('../../middleware/validateToken');
const genImgUrl = require('../../middleware/genSteamImgUrl');
const Game = require('../../models/game');

router.get('/', (req, res) => {
    Game.find((err, games) => {
        if (err) return res.status(400).send(`Error: ${err.message}`);
        res.status(200).send(games);
    });
});

router.get('/:id', (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        if (err) return res.status(400).send(`Error: ${err.message}`);
        if (!game) return res.status(404).send('Not Found');
        res.status(200).send(game);
    });
});

router.post('/',
    validateToken, 
    genImgUrl,
    (req, res) => {
        Game.create(req.body, (err, savedGame) => {
            if (err) return res.status(400).send(`Error: ${err.message}`);
            res.status(201).send(savedGame);
        });
    }
);

router.put('/:id', 
    validateToken,
    genImgUrl,
    (req, res) => {
        Game.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true }, (err, gameToUpdate) => {
            if (err) return res.status(400).send(`Error: ${err.message}`);
            if (!gameToUpdate) return res.status(404).send('Not Found');
            res.status(204).send();
        });
    }
);

router.delete('/:id', 
    validateToken,
    (req, res) => {
        Game.findByIdAndDelete(req.params.id, (err, deletedGame) => {
            if (err) return res.status(400).send(`Error: ${err.message}`);
            if (!deletedGame) return res.status(404).send('Not Found');
            res.status(204).send();
        });
    }
);

module.exports = router;