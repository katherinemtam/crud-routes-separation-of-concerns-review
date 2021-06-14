const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Season = require('../lib/models/Season.js');

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

  test('get all seasons via GET', async () => {
    const winter = await Season.insert({
      season: 'winter',
      startMonth: 'december',
      endMonth: 'february'
    });

    const spring = await Season.insert({
      season: 'spring',
      startMonth: 'march',
      endMonth: 'may'
    });

    const summer = await Season.insert({
      season: 'summer',
      startMonth: 'june',
      endMonth: 'august'
    });

    const fall = await Season.insert({
      season: 'fall',
      startMonth: 'september',
      endMonth: 'november'
    });

    const res = await request(app)
      .get('/api/v1/seasons');

    expect(res.body).toEqual([winter, spring, summer, fall]);
  });

  test('get a season via GET', async () => {

    const season = await Season.insert({
      season: 'spring',
      startMonth: 'march',
      endMonth: 'may'
    });

    const res = await request(app)
      .get(`/api/v1/seasons/${season.id}`);

    expect(res.body).toEqual(season);
  });

  test('update a season via PUT', async () => {
    const season = await Season.insert({
      season: 'fall',
      startMonth: 'september',
      endMonth: 'november'
    });

    season.season = 'autumn';

    const res = await request(app)
      .put(`/api/v1/seasons/${season.id}`)
      .send(season);

    expect(res.body).toEqual(season);
  });
});
