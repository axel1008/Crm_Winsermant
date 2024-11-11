const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/users', userController.getUsers); // Asegúrate de que la función esté bien implementada

module.exports = router;
