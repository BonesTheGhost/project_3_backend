//'places' route
const express = require('express');

const scoresController = require('../controllers/scores-controller');

const router = express.Router();



// ===== ===== ROUTES ===== =====
//DON'T FORGET THAT ROUTE ORDER MATTERS!!

//router.use/get/post.get('path', (req, res, next) => {})
router.get('/:sid', scoresController.getScoreById);

// '/api/scores/user/:uid
router.get('/user/:uid', scoresController.getScoresByUserId);

router.post('/', scoresController.createScore);

//THis works because it is a different kind of route
router.patch('/:sid', scoresController.updateScore)

router.delete('/:sid', scoresController.deleteScore)
// ===== ===== ====== ===== =====


module.exports = router;