const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// Registro de usuarios
exports.register = async (req, res) => {
  const { username, email, password, nombre, apellido } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, nombre, apellido });
    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
    console.error("Error durante el registro: ", error); // Registrar el error
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Solicitud de inicio de sesión recibida: ", req.body); // Registrar el cuerpo de la solicitud

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    console.log("Usuario encontrado: ", user); // Registrar el usuario encontrado

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Genera el token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, nombre: user.nombre, apellido: user.apellido },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log("Token generado: ", token); // Registrar el token generado

    // Devuelve el token y los datos del usuario
    res.status(200).json({
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role, nombre: user.nombre, apellido: user.apellido }
    });

  } catch (error) {
    console.error("Error durante el inicio de sesión: ", error); // Registrar el error en el backend
    res.status(500).json({ error: 'Error durante el inicio de sesión' });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Buscar todos los usuarios
    res.status(200).json(users); // Enviar los usuarios como respuesta
  } catch (error) {
    console.error("Error al obtener usuarios: ", error); // Registrar el error
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id); // Buscar usuario por ID
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await user.destroy(); // Eliminar usuario
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar usuario: ", error); // Registrar el error
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
