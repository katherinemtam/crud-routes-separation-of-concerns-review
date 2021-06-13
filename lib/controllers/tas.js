const { Router } = require('express');
const Ta = require('../models/Ta');

module.exports = Router()
  .post('/api/v1/tas', async (req, res) => {
    try {
      const ta = await Ta.insert(req.body);
      res.send(ta);

    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
