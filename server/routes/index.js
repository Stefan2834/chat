var express = require('express');
var router = express.Router();
const { Users } = require('./Schema')
 


router.post('/', async function (req, res, next) {
  try {
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.json({ success: false, message: err })
  }
});

router.post('/profile', async (req, res) => {
  const { email } = req.body
  try {
    const user = await Users.findOne({ email })
    if(user) {
      res.json({success:true, message:user})
    } else {
      res.json({success:false, message:'User not found'})
    }
  } catch (err) {
    res.json({ success: false, message: err })
  }
})

module.exports = router;
