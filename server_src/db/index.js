/*eslint no-console: 0 */
/* Mongo Database
 * - this is where we set up our connection to the mongo database
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/myprojectdb';

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', err => {
  console.log(`There was an error connecting to the database: ${err}`);
});
db.once('open', () => {
  console.log(
    `You have successfully connected to your mongo database: ${MONGODB_URI}`
  );
});

module.exports = db;
