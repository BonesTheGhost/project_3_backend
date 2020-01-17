//'places' route
const express = require('express');

const scoresController = require('../controllers/scores-controller');

const router = express.Router();



// ===== ===== ROUTES ===== =====
//DON'T FORGET THAT ROUTE ORDER MATTERS!!

//router.use/get/post.get('path', (req, res, next) => {})
router.get('/:sid', scoresController.getScoreById);

// '/api/scores/user/:uid
router.get('/user/:uid', scoresController.getScoreByUserId);
// ===== ===== ====== ===== =====


module.exports = router;