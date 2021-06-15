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
  })

  .get('/api/v1/tas', async (req, res) => {
    try {
      const tas = await Ta.findAll();
      res.send(tas);

    } catch(err) {
      res.status(500).send({ error: err.message });

    }
  })
  
  .get('/api/v1/tas/:id', async (req, res) => {
    try {
      const ta = await Ta.findById(req.params.id);
      res.send(ta);

    } catch(err) {   
      res.status(500).send({ error: err.message });

    }  
  })
  
  .put('/api/v1/tas/:id', async (req, res) => {
    try {
      const ta = await Ta.update(req.body, req.params.id);
      res.send(ta);
  
    } catch(err) {
      res.status(500).send({ error: err.message });

    }
  })

  .delete('/api/v1/tas/:id', async (req, res) => {
    try {
      const ta = await Ta.delete(req.params.id);
      res.send(ta);

    } catch(err) {
      res.status(500).send({ error: err.mesage });
      
    }
  })
  
;
