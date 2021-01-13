// dependencies
const express = require('express')
const mongoose = require('mongoose')

// configuration
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

// middleware
app.use(express.json())
app.use(express.static('public'))

const birdsController = require('./controllers/birds_controller.js')
app.use('/birds, birdsController')

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

//Error-Success
mongoose.connection.on('error', err =>
  console.log(
    err.message,
    'is Mongod not running?/Problem with Atlas connetion'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

app.listen(PORT, () => {
  console.log('Listening to you!');
})

// bird name
// bird image
// bird location
// date of sighting
