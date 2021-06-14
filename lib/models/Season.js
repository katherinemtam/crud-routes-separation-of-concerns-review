const pool = require('../utils/pool');

//export default class Season
module.exports = class Season {
  id;
  season;
  startMonth;
  endMonth;

  constructor(row) {
    this.id = row.id;
    this.season = row.season;
    this.startMonth = row.start_month;
    this.endMonth = row.end_month;
  }

  static async insert({ season, startMonth, endMonth }) {
    
    const { rows } = await pool.query(`
      INSERT INTO seasons (season, start_month, end_month)
      VALUES      ($1, $2, $3)
      RETURNING   *
    `, [season, startMonth, endMonth]);

    return new Season(rows[0]);
  }

  static async findAll() {

    const { rows } = await pool.query(`
      SELECT  *
      FROM    seasons
    `);

    return rows.map(row => new Season(row));
  }

  static async findById(id) {

    const { rows } = await pool.query(`
      SELECT  *
      FROM    seasons
      WHERE   id = $1
    `, [id]);

    return new Season(rows[0]); 
  }

  static async update(season, id) {

    const { rows } = await pool.query(`
      UPDATE    seasons
      SET       season = $1,
                start_month = $2,
                end_month = $3
      WHERE     id = $4
      RETURNING *
    `, [season.season, season.startMonth, season.endMonth, id]);

    return new Season(rows[0]);
  }
};
