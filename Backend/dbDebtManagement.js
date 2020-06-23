'use strict'

const db = require('./dbConnect')
const debtProcess = require('./debtProcess')

const createExpenseQuery = function (expense) {
  const command = 'INSERT INTO Expenses (description, amount, username, dateAdded) '
  const formattedData = `VALUES ('${expense.description}', '${expense.amount}', '${expense.username}', '${expense.dateAdded}');`
  return command + formattedData
}

async function getList () {
  try {
    const pool = await db.pools
    const expenses = await pool.request().query('SELECT * FROM Expenses')
    debtProcess.clearList()
    expenses.recordset.forEach(expense => {
      debtProcess.addExpense(expense)
      console.log(expense)
    })
  } catch (err) {
    console.log(err)
  }
}

const distributedAmount = async function () {
  try {
    const pools = await db.pools
    const users = await pools.request().query('SELECT username FROM Users')
    let userLength = users.recordset.length
    if (userLength > 1) { userLength = userLength - 1 }
    return userLength
  } catch (err) {
    console.log(err)
  }
}

const calculateAmount = function (amount, users) {
  const number = parseFloat(amount) / users
  const fixedNum = number.toFixed(2)
  return fixedNum
}

module.exports.addExpense = async function (details, res) {
  try {
    await getList()
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
    const newExpense = debtProcess.createExpense(details)
    const pool = await db.pools
    await pool.request().query(createExpenseQuery(newExpense))
    res.redirect('/home')
  } catch (err) {
    console.log(err)
    const message = 'Please Try Again'
    res.render('error.ejs',
      { error: 'Error Accessing Database', message: message, tips: [], link: '/home', button: 'home' })
  }
}

module.exports.getDebts = async function (req, res) {
  try {
    await getList()
    const expenses = debtProcess.getList()
    if ('user' in req.session) {
      const users = await distributedAmount()
      console.log(users)
      expenses.forEach(expense => {
        if (expense.username === req.session.user.username) {
          expense.status = 'mine'
        } else {
          expense.status = 'yours'
          expense.owed = calculateAmount(expense.amount, users)
        }
      })
    }

    res.json(expenses)
  } catch (err) {
    console.log(err)
    const message = 'Please Try Again'
    res.render('error.ejs',
      { error: 'Error Accessing Database', message: message, tips: [], link: '/home', button: 'home' })
  }
}
