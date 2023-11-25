'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Doctor_clinic_specialty', {

    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    doctorID: {
        type: Sequelize.INTEGER
    },
    clinicID: {
        type: Sequelize.INTEGER
    },
    specialtyID: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Doctor_clinic_specialty');
  }
};