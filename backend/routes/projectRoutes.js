const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/stats', authenticateToken, projectController.getProjectStats);

module.exports = router;
