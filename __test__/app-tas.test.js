const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Ta = require('../lib/models/Ta.js');

describe('ta routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test.only('create a ta via POST', async () => {
    const ta = {
      firstName: 'jena',
      lastName: 'boehm'
    };

    const res = await request(app)
      .post('/api/v1/tas')
      .send(ta);

    expect(res.body).toEqual({
      id: '1',
      firstName: 'jena',
      lastName: 'boehm'
    });
  });
});
