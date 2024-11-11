const { User } = require('../models');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'nombre', 'apellido'] });
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};
