'use strict'

const dataManager = require('./dbManagement')
const express = require('express')
const mainRouter = express.Router()

function checkSignIn (req, res, next) {
  if (req.session.user) { next() } else {
    const err = new Error('Not logged in')
    console.log(req.session.user)
    next(err)
  }
}

mainRouter.get('/', function (req, res) { // the welcome page
  res.render('index.ejs')
})

mainRouter.get('/home', checkSignIn, function (req, res) { // the main home page once signed in
  res.render('home.ejs', { firstName: req.session.user.firstName })
})

mainRouter.post('/create-user', function (req, res) { // will handle the user creation process
  console.log(req.body)
  dataManager.addUser(req.body, req, res)
})

mainRouter.post('/logged-in', function (req, res) { // will handle the user login process
  console.log(req.body)
  dataManager.login(req.body, req, res)
})

mainRouter.get('/logged-out', function (req, res) {
  const username = req.session.user.username
  req.session.destroy(function () {
    console.log(`User ${username} logged out`)
  })
  res.redirect('/')
})

mainRouter.use('/home', function (err, req, res, next) {
  console.log(err)
  res.redirect('/')
})

module.exports = mainRouter
