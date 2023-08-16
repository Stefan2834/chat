var express = require('express');
var router = express.Router();
const { Users } = require("./Schema")

router.get('/', function (req, res, next) {
  try {
    res.json({ success: true })
  } catch (err) {
    res.json({ success: false, message: err });
  }
});

router.post(`/`, async (req, res) => {
  const { email, name, image } = req.body
  try {
    const user = await Users.find({ email })
    if (user.length > 0) {
      res.json({ success: true })
    } else {
      const newUser = new Users({
        email: email,
        name: name,
        image: image
      })
      await newUser.save()
      res.json({ success: true })
    } 
  } catch (err) {
    console.error(err)
    res.json({ success: false, message: err })
  }
})

module.exports = router;
