const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('season routes', () => {
  beforeEach(() => {
    return setup(pool);  
  });

  test('create a season via POST', async () => {
    const season = {
      season: 'winter',
      startMonth: 'december',
      endMonth: 'february'
    };

    const res = await request(app)
      .post('/api/v1/seasons')
      .send(season);

    expect(res.body).toEqual({
      id: '1',
      season: 'winter',
      startMonth: 'december',
      endMonth: 'february'
    });
  });

});
