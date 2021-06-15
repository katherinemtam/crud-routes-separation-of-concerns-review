require('dotenv').config();
const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Tea = require('../lib/models/Tea.js');

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

  test('get all teas via GET', async () => {
    const chai = await Tea.insert({
      name: 'chai tea',
      type: 'black',
      origin: 'india',
      brewTempF: 195,
      brewTimeMinutesMin: 3,
      brewTimeMinutesMax: 4,
      hasSugar: true
    });  

    const sweet = await Tea.insert({
      name: 'sweet tea',
      type: 'black',
      origin: 'usa',
      brewTempF: 195,
      brewTimeMinutesMin: 3,
      brewTimeMinutesMax: 4,
      hasSugar: true
    });  

    const monkey = await Tea.insert({
      name: 'monkey picked white tea',
      type: 'white',
      origin: 'china',
      brewTempF: 175,
      brewTimeMinutesMin: 4,
      brewTimeMinutesMax: 5,
      hasSugar: false
    });  

    const res = await request(app)
      .get('/api/v1/teas');

    expect(res.body).toEqual([chai, sweet, monkey]);
  });

  test('get a tea via GET', async () => {
    const tea = await Tea.insert({
      name: 'po cha',
      type: 'black',
      origin: 'tibet',
      brewTempF: 195,
      brewTimeMinutesMin: 3,
      brewTimeMinutesMax: 4,
      hasSugar: false
    });

    const res = await request(app)
      .get(`/api/v1/teas/${tea.id}`);

    expect(res.body).toEqual(tea); 
  });

  test('update a tea via PUT', async () => {
    const tea = await Tea.insert({
      name: 'pu-erh',
      type: 'puerh',
      origin: 'china',
      brewTempF: 190,
      brewTimeMinutesMin: 3,
      brewTimeMinutesMax: 5,
      hasSugar: false
    });
    
    tea.name = 'pu\'er';
    
    const res = await request(app)
      .put(`/api/v1/teas/${tea.id}`)
      .send(tea);

    expect(res.body).toEqual(tea);
  });

  test('delete a tea via DELETE', async () => {
    const tea = await Tea.insert({
      name: 'phoenix tea',
      type: 'oolong',
      origin: 'china',
      brewTempF: 5,
      brewTimeMinutesMin: 3,
      brewTimeMinutesMax: 5,
      hasSugar: false
    });

    const res = await request(app)
      .delete(`/api/v1/teas/${tea.id}`)
      .send(tea);

    expect(res.body).toEqual(tea);
  });
});
