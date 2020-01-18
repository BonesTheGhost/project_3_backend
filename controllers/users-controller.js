const uuid = require('uuid/v4')
const HttpError = require('../models/http-error');

const { validationResult } = require('express-validator');


const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'PoochoGrande',
        email: 'test@test.com',
        password: 'YippeKaiYay'
    },

];


const getUsers = (req, res, next) => {
    res.status(200).json({ users: DUMMY_USERS});
};


//THIS NEEDS TO BE VALIDATED!! SO; 'validationResult' here, 'check' in the routes file!
const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed. Please check your data!', 422);
        
    };

    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if(hasUser) {
        throw new HttpError('Could not create user: email already exists!', 422 );
    }

    const createdUser = {
        id: uuid(),
        name: name,
        email: email,
        password: password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, please check credentials!');
    }
    
    res.json({message: 'Logged In!'});
};



// EXPORTS::
exports.getUsers = getUsers; 
exports.signup = signup;
exports.login = login;