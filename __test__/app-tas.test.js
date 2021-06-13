const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Ta = require('../lib/models/Ta.js');

describe('ta routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('create a ta via POST', async () => {
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

  test('finds all tas via GET', async () => {
    const bryana = await Ta.insert({
      firstName: 'bryana',
      lastName: 'kitchen'
    });
    const sarah = await Ta.insert({
      firstName: 'sarah',
      lastName: 'skillen'
    });
    const perry = await Ta.insert({
      firstName: 'perry',
      lastName: 'sittser'
    });
    
    const res = await request(app)
      .get('/api/v1/tas');


    expect(res.body).toEqual([bryana, sarah, perry]);
  });

  test('finds a ta via GET', async () => {
    const ta = await Ta.insert({
      firstName: 'new',
      lastName: 'alchemist'
    });

    const res = await request(app)
      .get(`/api/v1/tas/${ta.id}`);

    expect(res.body).toEqual(ta);
  });

  test('update a ta via PUT', async () => {
    const ta = await Ta.insert({
      firstName:'dan',
      lastName: 'bennington'
    });

    ta.lastName = 'bennington III';

    const res = await request(app)
      .put(`/api/v1/tas/${ta.id}`)
      .send(ta);

    expect(res.body).toEqual(ta);
  });
});
