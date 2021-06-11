const express = require('express');
const dogController = require('./controllers/dogs.js');
const birdController = require('./controllers/birds.js');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error.js');

const app = express();

app.use(express.json());

app.use(dogController);
app.use(birdController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
