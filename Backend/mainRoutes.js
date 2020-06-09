'use strict'

const path = require('path')
const accountProcess = require('./accountProcess')
const express = require('express')
const mainRouter = express.Router()

mainRouter.get('/', function (req, res) { // the welcome page
  res.sendFile(path.join(__dirname, '..', 'Views', 'index.html'))
})

mainRouter.get('/home', function (req, res) { // the main home page once signed in
  res.sendFile(path.join(__dirname, '..', 'Views', 'home.html'))
})

mainRouter.post('/create-user', function (req, res) { // will handle the user creation process
  if (!accountProcess.isUsernameValid(req.body.signUpUsername)) { res.send('Invalid username.'); return }
  if (!accountProcess.isEmailValid(req.body.signUpEmail)) { res.send('Invalid email address.'); return }
  if (!accountProcess.isPasswordValid(req.body.signUpUsername, req.body.signUpPassword)) { res.send('Invalid password.'); return }
  if (!accountProcess.isUsernameUnique(req.body.signUpUsername)) { res.send('Username is not unique'); return }
  if (!accountProcess.isEmailUnique(req.body.signUpEmail)) { res.send('Email address is not unique'); return }

  accountProcess.addUser(accountProcess.createUser(req.body))
  res.send('User created.')
})

mainRouter.post('/logged-in', function (req, res) { // will handle the user login process
  console.log(req.body)
  res.send('Logged in')
})
module.exports = mainRouter
