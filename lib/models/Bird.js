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

    return new Bird(rows[0]);
  }

  static async findAll() {

    const { rows } = await pool.query(`
      SELECT  *
      FROM    birds
    `);

    return rows.map(row => new Bird(row));
  }

  static async findById(id) {

    const { rows } = await pool.query(`
      SELECT  *
      FROM    birds
      WHERE   id = $1
    `, [id]);

    if(!rows[0]) return null;

    return new Bird(rows[0]); 
  }
};
