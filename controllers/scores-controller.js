const uuid = require('uuid/v4');
//So we can use our http error model.
const HttpError = require('../models/http-error');

// ===== ===== DATA ===== =====
let DUMMY_SCORES = [
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


const getScoresByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const scores = DUMMY_SCORES.filter(s => {
        return s.creator === userId;
    });

    //Have to use 'return next(error)'; with ASYNC code!!
    if (!scores || scores.length ===0) {
        return next(
            new HttpError('Could not find a score for that USER id (creator)', 404)
        );
    }

    res.json({ scores: scores });
};


//We use 'object-destructuring' { } here after 'const' to create certain constants that can be passed from the variable into the function.
const createScore = (req, res, next) => {
    const { title, description, location, score, creator } = req.body;

    const createdScore = {
        id: uuid(),
        title: title,
        description: description,
        location : location,
        score: score,
        creator: creator
    };

    DUMMY_SCORES.push(createdScore); //unshift(createdPlace)

    res.status(201).json({score: createdScore});
};


const updateScore = (req, res, next) => {
    const { title, description } = req.body;

    //Getting the id from the url
    const scoreId = req.params.sid;

    //
    const updatedScore = { ...DUMMY_SCORES.find(s => s.id === scoreId)};
    const scoreIndex = DUMMY_SCORES.findIndex(s => s.id === scoreId);
    updatedScore.title = title;
    updatedScore.description = description;

    DUMMY_SCORES[scoreIndex] = updatedScore;

    res.status(200).json({score: updatedScore});
};

const deleteScore = (req, res, next) => {
    const scoreId = req.params.sid;
    DUMMY_SCORES = DUMMY_SCORES.filter(s => s.id !== scoreId);
    res.status(200).json({message: 'Deleted Score'});
};




//How to export multiple things since module.exports only allows for a single export.
exports.getScoreById = getScoreById;
exports.getScoresByUserId = getScoresByUserId;
exports.createScore = createScore;
exports.updateScore = updateScore;
exports.deleteScore = deleteScore;

//Alternatives! (I chose used ES6 Arrow syntax)
//function getPlaceById() {...}
//const getPlaceById = function() {...}