const express = require('express');
const bodyParser = require('body-parser');

const scoresRoutes = require('./routes/scores-routes');

const app = express();



//Middleware
//We want to route certain requests to certain funcitons.
app.use('/api/scores', scoresRoutes);


app.listen(5000);