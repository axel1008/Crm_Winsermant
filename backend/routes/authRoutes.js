const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers); // Ruta para obtener todos los usuarios
router.delete('/user/:id', authController.deleteUser); // Ruta para eliminar un usuario

module.exports = router;
