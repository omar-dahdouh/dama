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

router.get('/users/delete', (req, res) => {
  User.deleteMany({}).then((results) => {
    res.json(results);
  });
});

// router.get('/Games/find', (req, res) => {
//   Games.find({}).then((results) => {
//     res.json(results);
//   });
// });

// router.get('/Games/new/:owner', async (req, res) => {
//   const { owner } = req.params;

//   const results = await newGame(owner);
//   console.log(results);
//   res.json(results);
// });

router.post('/login/github', github);

module.exports = router;
