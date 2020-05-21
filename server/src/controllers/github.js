const querystring = require('querystring');
const axios = require('axios');
const { sign } = require('./token');
const Users = require('../database/models/User');

module.exports = async (req, res) => {
  const { code } = req.body;

  const query = querystring.stringify({
    code,
    client_id: 'e6d8d57f54d0bbcda915',
    client_secret: '714b0cab60245a63a91ed4a98d48a367ae20abf4',
  });

  try {
    const result = await axios({
      method: 'POST',
      url: `https://github.com/login/oauth/access_token?${query}`,
      headers: {
        accept: 'application/json',
      },
    });

    const { access_token: accessToken } = result.data;

    if (accessToken) {
      const userInfo = await axios({
        method: 'GET',
        url: 'https://api.github.com/user',
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
      const { login, name, avatar_url: avatar } = userInfo.data;
      const token = await sign({ login });

      await Users.updateOne(
        { login },
        { login, name, avatar, token: accessToken },
        { upsert: true }
      );

      res.cookie('user', token).json({
        login,
        name,
        avatar,
      });
    } else {
      res.status(400).json(result.data);
    }
  } catch (e) {
    res.status(500).json({ message: 'server error' });
  }
};
