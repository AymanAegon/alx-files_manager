const express = require('express');

const routers = express.Router();

routers.get('/status', (req, res) => {
  res.send('User home page');
});

routers.get('/stats', (req, res) => {
  res.send('User profile page');
});

module.exports = routers;
