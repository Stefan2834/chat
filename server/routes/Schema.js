const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  email: String,
  name: String,
  image: String,
  posts: {
    src: String,
    likes: [String],
    comments: [{
      date: String,
      name: String,
      text: String,
    }]
  }
});

const Users = mongoose.model('users', usersSchema);


module.exports = {
  Users
}