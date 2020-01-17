//'places' route
const express = require('express');

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
        const error = new Error('Could not find a score for that id');
        error.code = 404;
        return next(error);
    }
    
    res.json({ score: score }); // { score } => { score: score }
});

// '/api/scores/user/:uid
router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;

    const score = DUMMY_SCORES.find(s => {
        return s.creator === userId;
    });

    //Have to use next(error); with ASYNC code!!
    if (!score) {
        const error = new Error('Could not find a score for that USER id (creator)');
        error.code = 404;
        return next(error);
    }

    res.json({ score: score });
});
// ===== ===== ====== ===== =====


module.exports = router;