const express = require('express');
const routers = require('./routes/index');

const app = express();
const port = process.env.POST || 5000;

routers(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
