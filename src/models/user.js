'use strict';
const {
  Model
} = require('sequelize');
const allcode = require('./allcode');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Allcode, { foreignKey: 'positionID', targetKey: 'keyMap', as: 'positionData' });
      User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
      User.hasOne(models.Markdown, { foreignKey: 'doctorId' });
      User.hasOne(models.Doctor_Info, { foreignKey: 'doctorID' });
      User.hasMany(models.Booking, { foreignKey: 'patientID', as: 'patientData' });
      // User.belongsToMany(models.Speciality, { through: models.DoctorSpecialty })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleID: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    positionID: DataTypes.STRING,
    image: DataTypes.BLOB('long'),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};