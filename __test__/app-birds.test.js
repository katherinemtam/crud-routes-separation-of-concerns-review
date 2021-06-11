const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('bird routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('create a dog via POST', async () => {
    const res = await request(app)
      .post('/api/v1/birds')
      .send({
        type: 'kiwi',
        origin: 'australia'
      });

    expect(res.body).toEqual({
      id: '1',
      type: 'kiwi',
      origin: 'australia'
    });
  });
});
