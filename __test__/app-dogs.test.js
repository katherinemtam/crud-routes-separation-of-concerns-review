const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Dog = require('../lib/models/Dog.js');

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

  test('find a dog via GET', async () => {
    const dog = await Dog.insert({
      name: 'roger',
      age: 10,
      weight: '65 lbs'
    });

    const res = await request(app)
      .get(`/api/v1/dogs/${dog.id}`);

    expect(res.body).toEqual(dog);
  });

  test('update a dog via PUT', async () => {
    const dog = await Dog.insert({
      name: 'snoopy',
      age: 70,
      weight: '20 lbs'
    });

    dog.age = 53;
    
    const res = await request(app)
      .put(`/api/v1/dogs/${dog.id}`)
      .send(dog);

    expect(res.body).toEqual(dog);
  });
  
  test('delete a dog via DELETE', async () => {
    const dog = await Dog.insert({
      name: 'laddy',
      age: 7,
      weight: '40 lbs'
    });
    
    const res = await request(app)
      .delete(`/api/v1/dogs/${dog.id}`)
      .send(dog);

    expect(res.body).toEqual(dog);
  });

});
