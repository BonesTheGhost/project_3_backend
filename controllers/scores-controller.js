//So we can use our http error model.
const HttpError = require('../models/http-error');

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

const getScoreById = (req, res, next) => {
    const scoreId = req.params.sid;

    const score = DUMMY_SCORES.find(s => {
        return s.id === scoreId;
    });

    //For if we cannot find a score. 'return' makes it so that if this triggers, no other response is sent (which would cause an error).
    if (!score) {
        return next(
            new HttpError('Could not find a score for that id.', 404)
        );
    }
    res.json({ score: score }); // { score } => { score: score }
}


const getScoreByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const score = DUMMY_SCORES.find(s => {
        return s.creator === userId;
    });

    //Have to use 'return next(error)'; with ASYNC code!!
    if (!score) {
        return next(
            new HttpError('Could not find a score for that USER id (creator)', 404)
        );
    }

    res.json({ score: score });
};

//How to export multiple things since module.exports only allows for a single export.
exports.getScoreById = getScoreById;
exports.getScoreByUserId = getScoreByUserId;

//Alternatives! (I chose used ES6 Arrow syntax)
//function getPlaceById() {...}
//const getPlaceById = function() {...}