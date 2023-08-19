const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  email: String,
  name: String,
  image: String,
  posts: [{
    src: String,
    image:String,
    email: String,
    message: String,
    _id:{
      $oid: String
    },
    likes: [String],
    comments: [{
      date: String,
      email: String,
      message: String,
      image: String
    }]
  }]
});

const Users = mongoose.model('users', usersSchema);


module.exports = {
  Users
}