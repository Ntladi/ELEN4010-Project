'use strict'

// Private
let expenses = []
let debts = []

const formatDescription = function (description) {
  description = description.toLowerCase()
  description = description[0].toUpperCase() + description.slice(1)
  return description
}
const formatAmount = function (amount) {
  const number = parseFloat(amount)
  const fixedNum = number.toFixed(2)
  amount = fixedNum.toString()
  return amount
}

module.exports = {
  isAmountNumber: function (amount) {
    if (isNaN(amount)) { return false }
    const number = parseFloat(amount)
    if (number <= 0) { return false }
    return true
  },

  doesExpenseExist: function (description) {
    description = description.toLowerCase()
    const expense = expenses.find((expense) => {
      return expense.description.toLowerCase() === description
    })

    if (typeof expense === 'undefined') { return false }
    return true
  },

  getExpense: function (description) {
    description = description.toLowerCase()
    const expense = expenses.find((expense) => {
      return expense.description.toLowerCase() === description
    })

    if (typeof expense === 'undefined') { return {} }
    return expense
  },

  createExpense: function (expense) {
    const description = formatDescription(expense.expenseDescription)
    const amount = formatAmount(expense.expenseAmount)
    const date = new Date()
    const newExpense = {
      description: description,
      amount: amount,
      username: expense.username,
      dateAdded: date.toLocaleString()
    }
    return newExpense
  },

  getList: function () {
    return [...expenses]
  },

  clearList: function () {
    expenses = []
  },

  addExpense: function (expense) {
    expenses.push(expense)
  },

  formatDescription: formatDescription,

  doesDebtExist: function (details) {
    for (let index = 0; index < debts.length; index++) {
      if (debts[index].debtID === details.debtID &&
        debts[index].payer === details.payer &&
        debts[index].paid === details.paid) {
        return true
      }
    }
    return false
  },

  clearDebtList: function () {
    debts = []
  },

  addDebt: function (debt) {
    debts.push(debt)
  },

  getDebts: function () {
    return [...debts]
  }

}
