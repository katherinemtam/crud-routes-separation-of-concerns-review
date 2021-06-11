import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Dog from '../lib/models/Dog.js';

// CRUD
// C - create   POST      INSERT
// R - read     GET       SELECT
// U - update   PUT       UPDATE
// D - delete   DELETE    DELETE

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('create a dog via POST', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    });
  });

  test('finds all dogs via GET', async () => {
    const spot = await Dog.insert({
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    });

    const willow = await Dog.insert({
      name: 'willow',
      age: 3,
      weight: '25 lbs'
    });
    
    const xe = await Dog.insert({
      name: 'xe',
      age: 7,
      weight: '80 lbs'
    });
    
    const res = await request(app)
      .get('/api/v1/dogs');

    expect(res.body).toEqual([spot, willow, xe]);
    
  });








});
