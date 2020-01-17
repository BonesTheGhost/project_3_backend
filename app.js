const express = require('express');
const bodyParser = require('body-parser');

const scoresRoutes = require('./routes/scores-routes');

const app = express();



// ===== ===== Middleware ===== =====
//We want to route certain requests to certain funcitons.

//This is necessary to grab data from the user and submit it to the backend.
app.use(bodyParser.json());

app.use('/api/scores', scoresRoutes);

//ERROR HANDLING MIDDLEWARE FUNCTION:
//It will execute if any middleware if front of it throws an error
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occured!'});
});

// ===== ===== ========== ===== =====

//npm start
app.listen(5000);