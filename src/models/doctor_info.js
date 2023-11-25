'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Doctor_Info.belongsTo(models.User, { foreignKey: 'doctorID' });
            Doctor_Info.belongsTo(models.Allcode, { foreignKey: 'priceID', targetKey: 'keyMap', as: 'priceData' });
            Doctor_Info.belongsTo(models.Allcode, { foreignKey: 'paymentID', targetKey: 'keyMap', as: 'paymentData' });
            Doctor_Info.belongsTo(models.Allcode, { foreignKey: 'provinceID', targetKey: 'keyMap', as: 'provinceData' });

        }
    };
    Doctor_Info.init({
        doctorID: DataTypes.INTEGER,
        specialtyID: DataTypes.INTEGER,
        clinicID: DataTypes.INTEGER,
        priceID: DataTypes.STRING,
        provinceID: DataTypes.STRING,
        paymentID: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,


    }, {
        sequelize,
        modelName: 'Doctor_Info',
        freezeTableName: true
    });
    return Doctor_Info;
};