const express = require('express')
const birds = express.Router()

const Bird = require('../models/bird.js')

birds.get('/', (req, res) => {
  Bird.find({}, (err, foundBirds) => {
    res.json(foundBirds)
  })
})

// create
birds.post('/', (req, res) => {
  Bird.create(req.body, (err, createdBird) => {
    Bird.find({}, (err, foundBirds) => {
      res.json()
    })
  })
})

// update
birds.put('/:id', (req, res) => {
  Bird.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedBirds) => {
      if (err) {
        res.send(err)
      } else {
        Bird.find({}, (err, foundBirds) => {
          res.json(foundBirds)
        })
      }
    }
  )
})

// delete
birds.delete('/:id', (req, res) => {
  Bird.findByIdAndRemove(req.params.id, (err, deletedBird) => {
    Bird.find({}, (err, foundBirds) => {
      res.json(foundBirds)
    })
  })
})

module.exports = birds
