'use strict'

// Private
let expenses = []

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
    const newExpense = {
      description: description,
      amount: amount
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

  formatDescription: function (description) {
    description = description.toLowerCase()
    description = description[0].toUpperCase() + description.slice(1)
    return description
  }
}
