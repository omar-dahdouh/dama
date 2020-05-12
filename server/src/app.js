const express = require('express');
const { join } = require('path');
const compression = require('compression');

const app = express();
app.disabled('x-powered-by');
app.set('port', process.env.PORT || 5000);

app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', '..', 'client', 'build')));
  app.all('*', (req, res) =>
    res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'))
  );
}

module.exports = app;
