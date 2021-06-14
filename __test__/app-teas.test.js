const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('tea routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('create a tea via POST', async () => {
    const tea = {
      name: 'matcha tea',
      type: 'green',
      origin: 'japan',
      brewTempF: 175,
      brewTimeMinutesMin: 3,
      brewTimeMinutesMax: 4,
      hasSugar: false
    };

    const res = await request(app)
      .post('/api/v1/teas')
      .send(tea);

    expect(res.body).toEqual({
      id: '1',
      name: 'matcha tea',
      type: 'green',
      origin: 'japan',
      brewTempF: 175,
      brewTimeMinutesMin: 3,
      brewTimeMinutesMax: 4,
      hasSugar: false
    });
  });
});
