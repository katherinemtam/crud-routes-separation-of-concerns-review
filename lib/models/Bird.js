const pool = require('../utils/pool');

module.exports = class Bird {
  id;
  type;
  origin;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.origin = row.origin;
  }

  static async insert({ type, origin }) {

    const { rows } = await pool.query(`
      INSERT INTO birds (type, origin)
      VALUES      ($1, $2)
      RETURNING   *
    `, [type, origin]
    );

    console.log(rows[0]);

    return new Bird(rows[0]);
  }
};
