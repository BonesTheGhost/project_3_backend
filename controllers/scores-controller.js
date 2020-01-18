const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
//So we can use our http error model.
const HttpError = require('../models/http-error');
const Score = require('../models/score');

const getScoreById = async (req, res, next) => {
    const scoreId = req.params.sid;

    let score;

    try {
        //use .exec() if you need a real promise here...
        score = await Score.findById(scoreId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a score with that id.', 500);
        return next(error);
    }
    //For if we cannot find a score. 'return' makes it so that if this triggers, no other response is sent (which would cause an error).
    if (!score) {
        const error = new HttpError('Could not find a score for that id.', 404);
        return next(error);
    }
    res.json({ score: score.toObject({ getters: true }) }); // { score } => { score: score }
}


const getScoresByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let scores;
    try {
        scores = await Score.find({ creator: userId });
    } catch (err) {
        const error = HttpError('Fetching scores failed, please try again later.', 500);
        return next(error);
    }

    //Have to use 'return next(error)'; with ASYNC code!!
    if (!scores || scores.length === 0) {
        return next(
            new HttpError('Could not find a score for that USER id (creator)', 404)
        );
    }

    res.json({ scores: scores.map(score => score.toObject({ getters: true })) });
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
const updateScore = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed. Please check your data!', 422)
        );
    };

    const { title, description } = req.body;

    //Getting the id from the url
    const scoreId = req.params.sid;

    let score;
    try {
        score = await Score.findById(scoreId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update score.',
            500
        );
        return next(error);
    }

    score.title = title;
    score.description = description;

    try {
        await score.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update score.',
            500
        );
        return next(error);
    }

    res.status(200).json({ score: score.toObject({ getters: true }) });
};


const deleteScore = async (req, res, next) => {
    const scoreId = req.params.sid;

    let score;
    try {
        score = await Score.findById(scoreId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete score.',
            500
        );
        return next(error);
    }

    try {
        await score.remove();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete score.',
            500
        );
        return next(error);
    }

    res.status(200).json({ message: 'Deleted Score' });
};


//How to export multiple things since module.exports only allows for a single export.
exports.getScoreById = getScoreById;
exports.getScoresByUserId = getScoresByUserId;
exports.createScore = createScore;
exports.updateScore = updateScore;
exports.deleteScore = deleteScore;

//Alternatives! (I chose used ES6 Arrow syntax)
//function getscoreById() {...}
//const getscoreById = function() {...}