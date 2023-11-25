'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, { foreignKey: 'positionID', as: 'positionData' });
      Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' });
      Allcode.hasMany(models.Booking, { foreignKey: 'timeType', as: 'bookingTimeData' });
      Allcode.hasOne(models.Schedule, { foreignKey: 'timeType', as: 'timeData' });
      Allcode.hasOne(models.Doctor_Info, { foreignKey: 'priceID', as: 'priceData' });
      Allcode.hasOne(models.Doctor_Info, { foreignKey: 'paymentID', as: 'paymentData' });
      Allcode.hasOne(models.Doctor_Info, { foreignKey: 'provinceID', as: 'provinceData' });
    }
  };
  Allcode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};