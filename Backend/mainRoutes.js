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
  console.log(req.body)
  if (!accountProcess.isUsernameValid(req.body.signUpUsername)) { res.send('Invalid username.'); return }
  if (!accountProcess.isEmailValid(req.body.signUpEmail)) { res.send('Invalid email address.'); return }
  if (!accountProcess.isPasswordValid(req.body.signUpUsername, req.body.signUpPassword)) { res.send('Invalid password.'); return }
  if (!accountProcess.isUsernameUnique(req.body.signUpUsername)) { res.send('Username is not unique'); return }
  if (!accountProcess.isEmailUnique(req.body.signUpEmail)) { res.send('Email address is not unique'); return }

  accountProcess.addUser(accountProcess.createUser(req.body))
  res.send('User created.')
})

mainRouter.post('/logged-in', function (req, res) { // will handle the user login process
  const details = req.body
  if ('loginUsername' in details) {
    const index = accountProcess.userNameExists(details.loginUsername)
    if (index !== -1) {
      const user = accountProcess.getList()[index]
      if (user.password === details.loginUsernamePassword) {
        res.send('login successful')
      } else { res.send('Invalid password') }
    } else { res.send('Invalid username.') }
  }

  if ('loginEmail' in req.body) {
    const index = accountProcess.emailExists(details.loginEmail)
    if (index !== -1) {
      const user = accountProcess.getList()[index]
      if (user.password === details.loginEmailPassword) {
        res.send('login successful')
      } else { res.send('Invalid password') }
    } else { res.send('Invalid email.') }
  }
})
module.exports = mainRouter
