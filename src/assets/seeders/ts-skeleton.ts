/* eslint @typescript-eslint/no-var-requires: 0 */
const fs = require('fs');

import type { QueryInterface } from 'sequelize';


const qi = (queryInterface): QueryInterface =>
  queryInterface.context ? queryInterface.context : queryInterface;

module.exports = {
  up: async (queryInterface: unknown): Promise<void> => {
    return qi(queryInterface).sequelize.transaction(async (transaction) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    });
  },

  down: async (queryInterface): Promise<void> =>
    qi(queryInterface).sequelize.transaction(async (transaction) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    }),
};

export {};

