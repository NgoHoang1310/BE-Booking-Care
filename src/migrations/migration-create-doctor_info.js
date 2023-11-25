'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Doctor_Info', {
            id: {
                allowNull: true,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            doctorID: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            specialtyID: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            clinicID: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            priceID: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            provinceID: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            paymentID: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            addressClinic: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nameClinic: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Doctor_Info');
    }
};