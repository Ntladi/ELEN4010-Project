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

const addExpenseBox = document.querySelector('#add-expense-box')
addExpenseBox.appendChild(newExpenseForm())

const addExpenseButton = document.querySelector('#add-expense-button')
const addExpenseCancelBetton = document.querySelector('#add-expense-cancel-button')
const allExpenses = document.querySelector('#expense-card-container')
listExpenses(allExpenses)

window.onclick = function (event) {
  if (event.target === addExpenseBox || event.target === addExpenseCancelBetton) {
    addExpenseBox.style.display = 'none'
  }
  if (event.target === addExpenseButton) {
    addExpenseBox.style.display = 'block'
  }
}
