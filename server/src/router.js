const router = require('express').Router();

const { github } = require('./controllers');

router.get('/hello', (req, res) => {
  res.send('world');
});

router.post('/login/github', github);

module.exports = router;
