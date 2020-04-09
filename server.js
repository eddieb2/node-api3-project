const express = require('express');
const morgan = require('morgan');
const server = express();
const userRouter = require('./users/userRouter');

server.use(express.json());
server.use(logger);
server.use(morgan('dev'));
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Custom middleware

function logger(req, res, next) {
  let date = new Date();
  console.log(`${req.method} request to ${req.originalUrl} on ${date}`);
  next();
}

module.exports = server;
