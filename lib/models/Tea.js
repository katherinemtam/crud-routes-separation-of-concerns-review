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

  static async findAll() {
    
    const { rows } = await pool.query(`
      SELECT *
      FROM   teas
    `);

    return rows.map(row => new Tea(row));
  }

  static async findById(id) {

    const { rows } = await pool.query(`
    SELECT *
    FROM   teas
    WHERE  id = $1
    `, [id]);

    return new Tea(rows[0]);
  }

  static async update(tea, id) {

    const { rows } = await pool.query(`
      UPDATE    teas
      SET       name = $1,
                type = $2,
                origin = $3,
                brew_temp_f = $4,
                brew_time_minutes_min = $5,
                brew_time_minutes_max = $6,
                has_sugar = $7
      WHERE     id = $8
      RETURNING *
    `, [tea.name, tea.type, tea.origin, tea.brewTempF, tea.brewTimeMinutesMin, tea.brewTimeMinutesMax, tea.hasSugar, id]
    );

    return new Tea(rows[0]);
  }

  static async delete(id) {

    const { rows } = await pool.query(`
    DELETE FROM teas
    WHERE       id = $1
    RETURNING   *
    `, [id]);

    return new Tea(rows[0]);
  }
};
