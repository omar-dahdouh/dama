// Users.js
const { Schema, model } = require('mongoose');

module.exports = model(
  'Users',
  new Schema({
    login: 'string',
    name: 'string',
    avatar: 'string',
    token: 'string',
  })
);
