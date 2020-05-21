const router = require('express').Router();
const { github, auth } = require('./controllers');
const User = require('./database/models/User');

router.get('/hello', (req, res) => {
  res.send('world');
});

router.get('/auth', auth);

router.get('/users/find', (req, res) => {
  User.find({}).then((results) => {
    res.json(results);
  });
});

router.post('/login/github', github);

module.exports = router;
