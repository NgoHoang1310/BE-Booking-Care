'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DoctorSpecialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Speciality.belongsToMany(models.Doctor_Info, { through: models.DoctorSpecialty });
            models.Doctor_Info.belongsToMany(models.Speciality, { through: models.DoctorSpecialty });
        }
    };
    DoctorSpecialty.init({
        specialtyID: DataTypes.INTEGER,
        doctorID: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'DoctorSpecialty',
    });
    return DoctorSpecialty;
};