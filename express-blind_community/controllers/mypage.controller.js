const dayjs = require('dayjs');


const PAGINATION_COUNT = 10;

const controller = {
  userData: async ({ userData }, { pool }, next) => {
    try {
      next('good');
    } catch (e) {
      next(e);
    }
  }
};

module.exports = controller;