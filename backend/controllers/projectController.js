const Project = require('../models/Project');

exports.getProjectStats = async (req, res) => {
  try {
    const userId = req.user.id; // Obtener el ID del usuario autenticado
    const openProjects = await Project.count({ where: { userId, status: 'open' } });
    const completedProjects = await Project.count({ where: { userId, status: 'completed' } });
    const totalWorkedHours = await Project.sum('hoursWorked', { where: { userId } });
    const totalProjectHours = await Project.sum('totalHours', { where: { userId } });

    res.status(200).json({
      openProjects,
      completedProjects,
      totalWorkedHours,
      totalProjectHours
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching project stats' });
  }
};
