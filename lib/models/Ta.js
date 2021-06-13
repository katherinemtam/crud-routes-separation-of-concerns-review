const pool = require('../utils/pool');

module.exports = class Ta {
  firstName;
  lastName;

  constructor(row) {
    this.id = row.id;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
  }

  static async insert({ firstName, lastName }) {

    const { rows } = await pool.query(`
      INSERT INTO tas (first_name, last_name)
      VALUES      ($1, $2)
      RETURNING   *
    `, [firstName, lastName]
    );

    return new Ta(rows[0]);
  }

  static async findAll() {
    
    const { rows } = await pool.query(`
      SELECT *
      FROM   tas
    `);

    return rows.map(row => new Ta(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT  *
      FROM    tas
      WHERE   id = $1
    `, [id]);

    return new Ta(rows[0]);
  }

  static async update(ta, id) {
    
    const { rows } = await pool.query(`
      UPDATE    tas
      SET       first_name = $1,
                last_name = $2
      WHERE     id = $3
      RETURNING *
    `, [ta.firstName, ta.lastName, id]);

    return new Ta(rows[0]);
  }
};
