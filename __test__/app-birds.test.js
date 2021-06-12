const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Bird = require('../lib/models/Bird.js');
const { response } = require('../lib/app.js');

describe('bird routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('create a bird via POST', async () => {
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

  test('get all birds via GET', async () => {
    const kiwi = await Bird.insert({
      type: 'kiwi',
      origin: 'australia'
    });

    const ostrich = await Bird.insert({
      type: 'ostrich',
      origin: 'africa'
    });

    const penguin = await Bird.insert({
      type: 'penguin',
      origin: 'antarctica'
    });
    
    const res = await request(app)
      .get('/api/v1/birds');

    expect(res.body).toEqual([kiwi, ostrich, penguin]);
  });

  test('get a bird via GET', async () => {
    const bird = await Bird.insert({
      type: 'flamingo',
      origin: 'south america'
    });

    const res = await request(app)
      .get(`/api/v1/birds/${bird.id}`);

    expect(res.body).toEqual({
      id: '1',
      type: 'flamingo',
      origin: 'south america'
    });
  });

  test('update a bird via PUT', async () => {
    const bird = await Bird.insert({
      type: 'penguin',
      origin: 'antarctica'
    });

    const res = await request(app)
      .put(`/api/v1/birds/${bird.id}`)
      .send(bird);
    
    expect(res.body).toEqual(bird);
  });
});
