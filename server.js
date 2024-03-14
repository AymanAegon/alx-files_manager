const express = require('express');
const routers = require('./routes/index');

const app = express();
const port = process.env.POST || 5000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

module.exports = app;
