const express = require('express');

const server = express();

server.use(logger);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Custom middleware

function logger(req, res, next) {
  let date = new Date();
  console.log(`${req.method} request to ${req.originalUrl} at ${date}`);
  next();
}

module.exports = server;
