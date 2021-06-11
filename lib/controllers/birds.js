const { Router } = require('express');
const Bird = require('../models/Bird');

module.exports = Router()
  .post('/api/v1/birds', async (req, res) => {
    try {
      const bird = await Bird.insert(req.body);
      res.send(bird);

    } catch(err) {
      res.status(500).send({ error: err.message });
    
    }
  })
  
  .get('/api/v1/birds', async (req, res) => {
    try {
      const birds = await Bird.findAll();
      res.send(birds);

    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .get('/api/v1/birds/:id', async (req, res) => {
    try {
      const bird = await Bird.findById(req.params.id);
      res.send(bird);

    } catch(err) {
      res.status(500).send({ error: err. message });

    }

  });
