const mongoose = require('mongoose');
require('env2')('config.env');

const URI =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_PROD
    : process.env.DB_TEST;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('mongo database is connected'))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
