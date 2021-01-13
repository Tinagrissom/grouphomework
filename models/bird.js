const mongoose = require('mongoose')

const birdSchema = new mongoose.Schema({
  name: String,
  image: String,
  date: String,
  location: String,
})

const Bird = mongoose.model('Bird', birdSchema)

module.exports = Bird 
