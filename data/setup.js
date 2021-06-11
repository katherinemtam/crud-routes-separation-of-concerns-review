const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs').promises;
// const path = require('path');

module.exports = (pool) => {
  return fs
    .readFile(
      'C:/Users/Kat/alchemy/career-track/lab-04-review/sql/setup.sql',
      {
        encoding: 'utf-8',
      }
    )
    .then((sql) => pool.query(sql));
};
