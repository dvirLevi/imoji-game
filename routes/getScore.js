var express = require('express');
const router = express.Router();
const connectDB = require('../connectDB.js');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const connect = await connectDB();
  let arrScore = await connect.findOne({
    name: 'score'
  })
  let arrSort = arrScore.table.sort((a, b) => {
    return b.score - a.score
  });
  res.send(arrSort)
});

module.exports = router;