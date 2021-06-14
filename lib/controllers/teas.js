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
  });
