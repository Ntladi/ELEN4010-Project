'use strict'

import { listExpenses } from './modules/api-handler-script.js'

const newInputField = function (id, placeholder, labelText, required) {
  const field = document.createElement('input')
  const label = document.createElement('label')

  // set field attributes
  field.placeholder = placeholder
  field.setAttribute('id', id)
  field.setAttribute('name', id)
  field.required = required
  field.setAttribute('type', 'text')

  // set label attributes
  label.textContent = labelText
  label.htmlFor = id

  return [field, label]
}

const newExpenseForm = function () {
  // initialise DOM attributes for the signup form
  const form = document.createElement('form')
  const container = document.createElement('div')
  const heading = document.createElement('h1')
  const line = document.createElement('hr')
  const buttons = document.createElement('div')
  const submitButton = document.createElement('button')
  const cancelButton = document.createElement('button')

  // initialise all fields
  const descriptionField = newInputField('expenseDescription', 'Enter Description', 'Description', true)
  const amountField = newInputField('expenseAmount', 'Enter Amount', 'Amount', true)

  // set form attributes
  form.classList = 'modal-box'
  form.action = '/api/add-expense'
  form.method = 'post'

  // set container attributes
  container.classList = 'submission-form'
  buttons.classList = 'modal-button-container'

  // set heading attributes
  heading.textContent = 'Add Expense'

  // set button attributes
  submitButton.textContent = 'Create'
  cancelButton.textContent = 'Cancel'
  submitButton.setAttribute('type', 'submit')
  cancelButton.setAttribute('type', 'button')
  cancelButton.setAttribute('id', 'add-expense-cancel-button')
  submitButton.classList = 'modal-submit-button'
  cancelButton.classList = 'modal-cancel-button'

  // append buttons to their container
  buttons.appendChild(submitButton)
  buttons.appendChild(cancelButton)

  // append DOM attributes to container
  container.appendChild(heading)
  container.appendChild(line)
  container.appendChild(descriptionField[1])
  container.appendChild(descriptionField[0])
  container.appendChild(amountField[1])
  container.appendChild(amountField[0])
  container.appendChild(buttons)

  // append container to form
  form.appendChild(container)

  return form
}

const newFilterForm = function () {
  // initialise DOM attributes for the signup form
  const form = document.createElement('form')
  const container = document.createElement('div')
  const heading = document.createElement('h1')
  const line = document.createElement('hr')
  const buttons = document.createElement('div')
  const submitButton = document.createElement('button')
  const myExpensesButton = document.createElement('button')
  const pendingDebtsButton = document.createElement('button')
  const settledDebtsButton = document.createElement('button')
  const otherExpensesButton = document.createElement('button')

  // initialise all fields

  // set heading attributes
  heading.textContent = 'Filter Expenses'
  // set form attributes
  form.classList = 'modal-box'
  // set container attributes
  container.classList = 'submission-form'

  // set button attributes
  submitButton.textContent = 'Apply'
  submitButton.classList = 'modal-submit-button'
  submitButton.setAttribute('type', 'button')

  // set button attributes
  myExpensesButton.textContent = 'Show My Posted Expenses'
  myExpensesButton.classList = 'modal-filter-button'
  myExpensesButton.setAttribute('type', 'button')
  myExpensesButton.setAttribute('id', 'show-my-expenses-button')

  pendingDebtsButton.textContent = 'Show My Pending Expenses'
  pendingDebtsButton.classList = 'modal-filter-button'
  pendingDebtsButton.setAttribute('type', 'button')
  pendingDebtsButton.setAttribute('id', 'show-my-pending-debts-button')

  settledDebtsButton.textContent = 'Show My Settled Expenses'
  settledDebtsButton.classList = 'modal-filter-button'
  settledDebtsButton.setAttribute('type', 'button')
  settledDebtsButton.setAttribute('id', 'show-my-settled-debts-button')

  otherExpensesButton.textContent = 'Show Other Expenses'
  otherExpensesButton.classList = 'modal-filter-button'
  otherExpensesButton.setAttribute('type', 'button')
  otherExpensesButton.setAttribute('id', 'show-my-settled-debts-button')

  // append buttons to their container
  buttons.appendChild(submitButton)

  // append DOM attributes to container
  container.appendChild(heading)
  container.appendChild(line)
  container.appendChild(myExpensesButton)
  container.appendChild(pendingDebtsButton)
  container.appendChild(settledDebtsButton)
  container.appendChild(otherExpensesButton)
  container.appendChild(document.createElement('br'))
  container.appendChild(buttons)
  form.appendChild(container)

  return form
}

const addExpenseBox = document.querySelector('#add-expense-box')
addExpenseBox.appendChild(newExpenseForm())

const filterExpenseBox = document.querySelector('#filter-expense-box')
filterExpenseBox.appendChild(newFilterForm())

const addExpenseButton = document.querySelector('#add-expense-button')
const filterCardsButton = document.querySelector('#filter-expenses-button')
const addExpenseCancelButton = document.querySelector('#add-expense-cancel-button')
const allExpenses = document.querySelector('#expense-card-container')
listExpenses(allExpenses)

window.onclick = function (event) {
  if (event.target === addExpenseBox || event.target === addExpenseCancelButton) {
    addExpenseBox.style.display = 'none'
  }
  if (event.target === addExpenseButton) {
    addExpenseBox.style.display = 'block'
  }
  if (event.target === filterCardsButton) {
    filterExpenseBox.style.display = 'block'
  }
  if (event.target === filterExpenseBox) {
    filterExpenseBox.style.display = 'none'
  }
}
