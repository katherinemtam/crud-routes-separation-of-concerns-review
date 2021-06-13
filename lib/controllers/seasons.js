const { Router } = require('express');
const Season = require('../models/Season');

module.exports = Router()
  .post('/api/v1/seasons', async (req, res) => {
    try {
      const season = await Season.insert(req.body);
      res.send(season);

    } catch(err) {
      res.status(500).send({ error: err.message });

    }
  })
  
  .get('/api/v1/seasons', async (req, res) => {
    try {
      const seasons = await Season.findAll();
      res.send(seasons);
    } catch(err) {
      res.status(500).send({ error:err.message });

    }
  });
