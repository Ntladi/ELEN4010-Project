'use strict'

const path = require('path')
const dataManager = require('./dbManagement')
const express = require('express')
const mainRouter = express.Router()

mainRouter.get('/', function (req, res) { // the welcome page
  res.sendFile(path.join(__dirname, '..', 'Views', 'index.html'))
})

mainRouter.get('/home', function (req, res) { // the main home page once signed in
  res.sendFile(path.join(__dirname, '..', 'Views', 'home.html'))
})

mainRouter.post('/create-user', function (req, res) { // will handle the user creation process
  console.log(req.body)
  dataManager.addUser(req.body, res)
})

mainRouter.post('/logged-in', function (req, res) { // will handle the user login process
  console.log(req.body)
  dataManager.login(req.body, res)
})
module.exports = mainRouter
