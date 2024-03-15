const express = require('express');
import AppController from '../controllers/AppController';

const routers = (api) => {
  api.get('status', AppController.getStatus);
  api.get('stats', AppController.getStats);
}

module.exports = routers;
