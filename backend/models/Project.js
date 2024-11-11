module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'completed'),
      allowNull: false,
    },
    hoursWorked: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalHours: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return Project;
};
