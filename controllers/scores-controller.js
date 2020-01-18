const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
//So we can use our http error model.
const HttpError = require('../models/http-error');
const Score = require('../models/score');

// ===== ===== DATA ===== =====
let DUMMY_SCORES = [
    {
        id: 's1',
        title: 'World_1: Empire',
        description: 'The first big thing',
        score: 'Address',
        creator: 'u1'
    }
];
// ===== ===== ==== ===== =====

const getScoreById = async (req, res, next) => {
    const scoreId = req.params.sid;

    let score;

    try {
        //use .exec() if you need a real promise here...
        score = await Score.findById(scoreId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a place with that id.', 500);
        return next(error);
    }
    //For if we cannot find a score. 'return' makes it so that if this triggers, no other response is sent (which would cause an error).
    if (!score) {
        const error = new HttpError('Could not find a score for that id.', 404);
        return next(error);
    }
    res.json({ score: score.toObject({ getters: true }) }); // { score } => { score: score }
}


const getScoresByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const scores = DUMMY_SCORES.filter(s => {
        return s.creator === userId;
    });

    //Have to use 'return next(error)'; with ASYNC code!!
    if (!scores || scores.length === 0) {
        return next(
            new HttpError('Could not find a score for that USER id (creator)', 404)
        );
    }

    res.json({ scores: scores });
};


//We use 'object-destructuring' { } here after 'const' to create certain constants that can be passed from the variable into the function.
//This validationResult looks into the request object and checks for validtion erros based on setup in 'scores-routes'.
const createScore = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { title, description, score, creator } = req.body;


    const createdScore = new Score({
        title: title,
        description: description,
        image: 'https://homepages.cae.wisc.edu/~ece533/images/goldhill.png',
        score: score,
        creator: creator
    });

    try {
        //This handles storing information in our database AND creates our unique ID. Its also ASYNC!!
        await createdScore.save();
    } catch (err) {
        const error = new HttpError('Creating score failed. Please try again!', 500);
        return next(error);
    }

    res.status(201).json({ score: createdScore });
};

//THIS ALSO IS VALIDATED!!!
const updateScore = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed. Please check your data!', 422);

    };

    const { title, description } = req.body;

    //Getting the id from the url
    const scoreId = req.params.sid;

    //
    const updatedScore = { ...DUMMY_SCORES.find(s => s.id === scoreId) };
    const scoreIndex = DUMMY_SCORES.findIndex(s => s.id === scoreId);
    updatedScore.title = title;
    updatedScore.description = description;

    DUMMY_SCORES[scoreIndex] = updatedScore;

    res.status(200).json({ score: updatedScore });
};


const deleteScore = (req, res, next) => {
    const scoreId = req.params.sid;
    if (!DUMMY_SCORES.find(s => s.id === scoreId)) {
        throw new HttpError('Could not find a score for that id!');
    };
    DUMMY_SCORES = DUMMY_SCORES.filter(s => s.id !== scoreId);
    res.status(200).json({ message: 'Deleted Score' });
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