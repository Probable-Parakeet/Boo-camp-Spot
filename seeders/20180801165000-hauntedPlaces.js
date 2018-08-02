'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('hauntedPlaces', [{
        name: '',
        description: '',
        location: '',
        userID: '',
        typeID: ''
      }], {});
  },

  down: (queryInterface, Sequelize) => {

      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkDelete('hauntedPlaces', null, {});
  }
};
