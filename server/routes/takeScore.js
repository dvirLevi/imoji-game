var express = require('express');
const router = express.Router();
const connectDB = require('../connectDB.js');

router.post('/', async (req, res, next) => {
  const obj = req.body;
  console.log(obj)
  const connect = await connectDB();
  await connect.updateOne({
    name: 'score'
  }, {
    $push: {
      table: {
        $each: [req.body],
        $position: 0
      }
    }
  });

  res.status(200).json('okput')
});

module.exports = router;