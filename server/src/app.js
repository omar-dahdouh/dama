const express = require('express');
const { join } = require('path');
const compression = require('compression');
const router = require('./router');

const app = express();
app.disabled('x-powered-by');
app.set('port', process.env.PORT || 5000);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', '..', 'client', 'build')));
  app.get('*', (req, res) =>
    res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'))
  );
}

module.exports = app;
