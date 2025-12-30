// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const mongoURL = 'mongodb+srv://MayankSoni:mayankpass@staynest.8fo9pex.mongodb.net/?appName=StayNest';


// let _db;

// const mongoConnect = (callback) => {
//     MongoClient.connect(mongoURL)
//     .then((client) => {
//     console.log('Connected to MongoDB');
//     callback();
//     _db = client.db('staynest');

// })
//     .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
// });
// };

// const getDb = () => {
//     if (_db) {
//     return _db;
//     }
//     throw 'No database found!';
// };

// exports.getDb = getDb;
// exports.mongoConnect = mongoConnect;