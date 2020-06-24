'use strict'

const db = require('./dbConnect')
const debtProcess = require('./debtProcess')

const createExpenseQuery = function (expense) {
  const command = 'INSERT INTO Expenses (description, amount, username, dateAdded) '
  const formattedData = `VALUES ('${expense.description}', '${expense.amount}', '${expense.username}', '${expense.dateAdded}');`
  return command + formattedData
}

const settleDebtsQuery = function (debt) {
  const command = 'INSERT INTO Paid (debtID, description, payer, paid, datePayed) '
  const formattedData = `VALUES ('${debt.debtID}', '${debt.description}', '${debt.payer}', '${debt.paid}', '${debt.datePayed}');`
  return command + formattedData
}

async function getExpenseList () {
  try {
    const pool = await db.pools
    const expenses = await pool.request().query('SELECT * FROM Expenses')
    debtProcess.clearList()
    expenses.recordset.forEach(expense => {
      debtProcess.addExpense(expense)
      // console.log(expense)
    })
  } catch (err) {
    console.log(err)
  }
}

async function getDebtsList () {
  try {
    const pool = await db.pools
    const debts = await pool.request().query('SELECT * FROM Paid')
    debtProcess.clearDebtList()
    debts.recordset.forEach(debt => {
      debtProcess.addDebt(debt)
      console.log(debt)
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
    await getExpenseList()
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

module.exports.getExpenses = async function (req, res) {
  try {
    await getExpenseList()
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

module.exports.settleDebt = async function (debt, res) {
  try {
    await getDebtsList()
    if (!debtProcess.doesDebtExist(debt)) {
      const pool = await db.pools
      await pool.request().query(settleDebtsQuery(debt))
      console.log('Valid Debt')
    }
    res.redirect('/home')
  } catch (err) {
    console.log(err)
  }
}

module.exports.getDebts = async function (details, res) {
  try {

  } catch (err) {

  }
}
