const mongo = require('mongodb')

let connectDB = async () =>  {
const url = process.env.NONGO_URI || 'mongodb://localhost:27017';
const connection = await mongo.MongoClient.connect(url,{
    useNewUrlParser: true
});
const db = connection.db('emojiGame');
return db.collection('score');
};

module.exports = connectDB;
