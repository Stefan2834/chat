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

router.post('/posts', async (req, res) => {
  const email = 'iosifs617@gmail.com'
  const newPost = {
    src: '',
    image:'',
    email: 'iosifs617@gmail.com',
    message: 'gela gela ce chiloti are pe ea',
    likes:[],
    comments:[],
  }
  try {
    const user = await Users.findOne({ email })
    console.log(user.posts)
    user.posts = [...user.posts, newPost]
    await user.save()
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.json({ success: false, message: err })
  }
})

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

router.patch('/posts', async (req, res) => {
  const { email, date, image, message, id, photoEmail } = req.body
  try {
    const comment = { email, date, message, image }
    const user = await Users.findOne({ email: photoEmail });
    console.log(photoEmail)
    const postIndex = user.posts.findIndex(post => post._id.$oid === id.$oid);
    user.posts[postIndex].comments.push(comment);
    await user.save();
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.json({ success: false, message: err })
  }
})

module.exports = router;
