const { Router } = require('express');
const Tea = require('../models/Tea');

module.exports = Router()
  .post('/api/v1/teas', async (req, res) => {
    try {
      const tea = await Tea.insert(req.body);
      res.send(tea);

    } catch(err) {
      res.status(500).send({ error: err.message });

    }
  })
  
  .get('/api/v1/teas', async (req, res) => {
    try {
      const teas = await Tea.findAll();
      res.send(teas);

    } catch(err) {
      res.status(500).send({ error: err.message });

    }
  })
  
  .get('/api/v1/teas/:id', async (req, res) => {
    try {
      const tea = await Tea.findById(req.params.id);
      res.send(tea);

    } catch(err) {
      res.status(500).send({ error: err.message });
      
    }
  })
  
  
;
