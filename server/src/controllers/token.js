const jwt = require('jsonwebtoken');
require('env2')('./config.env');

exports.sign = (data) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      data,
      process.env.secretKey,
      { algorithm: 'HS256' },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });

exports.verify = (data) => {
  jwt.verify(data, process.env.secretKey, (err, decoded) => {
    // if (err) reject(err);
    // resolve(token);
  });
};
