//'places' route
const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();


// ===== ===== DATA ===== =====
const DUMMY_SCORES = [
    {
        id: 's1',
        title: 'World_1: Empire',
        description: 'The first big thing',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        score: 'Address',
        creator: 'u1'
    }
];
// ===== ===== ==== ===== =====


// ===== ===== ROUTES ===== =====
//DON'T FORGET THAT ROUTE ORDER MATTERS!!

//router.use/get/post.get('path', (req, res, next) => {})
router.get('/:sid', (req, res, next) => {
    const scoreId = req.params.sid;

    const score = DUMMY_SCORES.find(s => {
        return s.id === scoreId;
    });

    //For if we cannot find a score. 'return' makes it so that if this triggers, no other response is sent (which would cause an error).
    if (!score) {
        return next(new HttpError('Could not find a score for that id.', 404));
    }

    res.json({ score: score }); // { score } => { score: score }
});

// '/api/scores/user/:uid
router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;

    const score = DUMMY_SCORES.find(s => {
        return s.creator === userId;
    });

    //Have to use 'return next(error)'; with ASYNC code!!
    if (!score) {
        return next(new HttpError('Could not find a score for that USER id (creator)', 404));
    }

    res.json({ score: score });
});
// ===== ===== ====== ===== =====


module.exports = router;