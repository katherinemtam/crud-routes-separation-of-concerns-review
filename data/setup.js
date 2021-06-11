import dotenv from 'dotenv';
dotenv.config();
import { promises as fs } from 'fs';
import path from 'path';

export default (pool) => {
  return fs
    .readFile(
      'C:/Users/Kat/alchemy/career-track/lab-04-review/sql/setup.sql',
      {
        encoding: 'utf-8',
      }
    )
    .then((sql) => pool.query(sql));
};
