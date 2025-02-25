/* eslint @typescript-eslint/no-var-requires: 0 */
const fs = require('fs');

import type { QueryInterface } from 'sequelize';

const qi = (queryInterface): QueryInterface =>
  queryInterface.context ? queryInterface.context : queryInterface;

module.exports = {
  up: async (queryInterface: unknown): Promise<void> => {
    return qi(queryInterface).sequelize.transaction(async (transaction) => {
      /**
       * Add altering commands here.
       *
       * Example:
       * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
       */
    });
  },

  down: async (queryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */
    }),
};

export {};

