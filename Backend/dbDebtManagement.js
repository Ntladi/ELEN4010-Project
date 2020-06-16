'use strict'

const debtProcess = require('./debtProcess')

module.exports.addExpense = async function (details, res) {
  try {
    if (debtProcess.doesExpenseExist(details.expenseDescription)) {
      const message = `The expense '${debtProcess.formatDescription(details.expenseDescription)}' already exists.`
      res.render('error.ejs',
        { error: 'Invalid Expense', message: message, tips: [], link: '/home', button: 'Home' })
      return
    }
    if (!debtProcess.isAmountNumber(details.expenseAmount)) {
      const message = `'${details.expenseAmount}' is not a valid amount. A valid amount must:`
      const tips = ['Be an integer or a float', 'Be greater than zero']
      res.render('error.ejs',
        { error: 'Invalid Expense', message: message, tips: tips, link: '/home', button: 'Home' })
      return
    }
    debtProcess.addExpense(debtProcess.createExpense(details))
    console.log(debtProcess.getList())
    res.redirect('/home')
  } catch (err) {
    console.log(err)
    const message = 'Please Try Again'
    res.render('error.ejs',
      { error: 'Error Accessing Database', message: message, tips: [], link: '/home', button: 'home' })
  }
}

module.exports.getDebts = async function (res) {
  try {
    res.json(debtProcess.getList())
  } catch (err) {
    console.log(err)
    const message = 'Please Try Again'
    res.render('error.ejs',
      { error: 'Error Accessing Database', message: message, tips: [], link: '/home', button: 'home' })
  }
}
