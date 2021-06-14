const pool = require('../utils/pool');

module.exports = class Tea {
  id;
  name;
  type;
  origin;
  brewTempF;
  brewTimeMinutesMin;
  brewTimeMinutesMax;
  hasSugar;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.origin = row.origin;
    this.brewTempF = row.brew_temp_f;
    this.brewTimeMinutesMin = row.brew_time_minutes_min;
    this.brewTimeMinutesMax = row.brew_time_minutes_max;
    this.hasSugar = row.has_sugar;
  }

  static async insert({ name, type, origin, brewTempF, brewTimeMinutesMin, brewTimeMinutesMax, hasSugar }) {

    const { rows } = await pool.query(`
      INSERT INTO teas (name, type, origin, brew_temp_f, brew_time_minutes_min, brew_time_minutes_max, has_sugar)
      VALUES      ($1, $2, $3, $4, $5, $6, $7)
      RETURNING   *
    `, [name, type, origin, brewTempF, brewTimeMinutesMin, brewTimeMinutesMax, hasSugar]);

    return new Tea(rows[0]);
  }

};
