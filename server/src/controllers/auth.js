const { verify } = require('./token');
const User = require('../database/models/User');

module.exports = async (req, res) => {
  const { user } = req.cookies;

  try {
    const decoded = verify(user);
    const { login } = decoded;
    const thisUser = await User.findOne({ login });
    if (thisUser) {
      const { name, avatar } = thisUser;
      res.json({ login, name, avatar });
    } else {
      res.status(404).json({
        message: 'failed to find user',
      });
    }
  } catch (error) {
    res.status(401).json({
      message: 'failed to authorize user',
    });
  }
};
