'use strict'

const accountManager = require('./dbAccountManagement')
const debtManager = require('./dbDebtManagement')
const express = require('express')
const mainRouter = express.Router()

function checkSignIn (req, res, next) {
  if (req.session.user) { next() } else {
    const err = new Error('Not logged in')
    console.log(req.session.user)
    next(err)
  }
}

/// ////////////////// User Get Routes

mainRouter.get('/', function (req, res) { // the welcome page
  res.render('index.ejs')
})

mainRouter.get('/home', checkSignIn, function (req, res) { // the main home page once signed in
  res.render('home.ejs', { firstName: req.session.user.firstName })
})

mainRouter.get('/logged-out', function (req, res) {
  const username = req.session.user.username
  req.session.destroy(function () {
    console.log(`User ${username} logged out`)
  })
  res.redirect('/')
})

/// ////////////////// User Post Routes

mainRouter.post('/api/create-user', function (req, res) { // will handle the user creation process
  console.log(req.body)
  accountManager.addUser(req.body, req, res)
})

mainRouter.post('/api/logged-in', function (req, res) { // will handle the user login process
  console.log(req.body)
  accountManager.login(req.body, req, res)
})

/// ////////////////// User Checks

mainRouter.use('/home', function (err, req, res, next) {
  console.log(err)
  res.redirect('/')
})

/// ////////////////// Debt Get Routes
mainRouter.post('/api/add-expense', checkSignIn, function (req, res) { // will handle the user creation process
  console.log(req.body)
  debtManager.addExpense(req.body, res)
})

/// ////////////////// Debt Post Routes

/// ////////////////// Debt Checks

module.exports = mainRouter
