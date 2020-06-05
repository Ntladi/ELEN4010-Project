'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()

mainRouter.get('/', function (req, res) { // the home page
  res.sendFile(path.join(__dirname, '..', 'Views', 'home.html'))
})

mainRouter.get('/signup', function (req, res) { // the sign up page
  res.sendFile(path.join(__dirname, '..', 'Views', 'signup.html'))
})

module.exports = mainRouter
