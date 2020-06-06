'use strict'

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

const signUpForm = function () {
  // initialise DOM attributes for the signup form
  const form = document.createElement('form')
  const container = document.createElement('div')
  const heading = document.createElement('h1')
  const line = document.createElement('hr')
  const buttons = document.createElement('div')
  const submitButton = document.createElement('button')
  const cancelButton = document.createElement('button')

  // initialise all fields
  const nameField = newInputField('sign-up-name', 'Enter Name', 'Name', true)
  const surnameField = newInputField('sign-up-surname', 'Enter Surname', 'Surname', true)
  const usernameField = newInputField('sign-up-username', 'Enter Username', 'Username', true)
  const emailField = newInputField('sign-up-email', 'Enter Email', 'Email', true)
  const passField = newInputField('sign-up-password', 'Enter Password', 'Password', true)
  passField[0].setAttribute('type', 'password')

  // set form attributes
  form.classList = 'modal-content'
  form.action = '/create-user'
  form.method = 'post'

  // set container attributes
  container.classList = 'container'
  buttons.classList = 'modal-buttons'

  // set heading attributes
  heading.textContent = 'Sign Up'

  // set button attributes
  submitButton.textContent = 'Create'
  cancelButton.textContent = 'Cancel'
  submitButton.setAttribute('type', 'submit')
  cancelButton.setAttribute('type', 'button')
  submitButton.classList = 'submit-button'
  cancelButton.classList = 'cancel-button'

  // append buttons to their container
  buttons.appendChild(submitButton)
  buttons.appendChild(cancelButton)

  // append DOM attributes to container
  container.appendChild(heading)
  container.appendChild(line)
  container.appendChild(nameField[1])
  container.appendChild(nameField[0])
  container.appendChild(surnameField[1])
  container.appendChild(surnameField[0])
  container.appendChild(usernameField[1])
  container.appendChild(usernameField[0])
  container.appendChild(emailField[1])
  container.appendChild(emailField[0])
  container.appendChild(passField[1])
  container.appendChild(passField[0])
  container.appendChild(buttons)

  // append container to form
  form.appendChild(container)

  return form
}

const signUpBox = document.querySelector('#sign-up-box')
const signUpButton = document.querySelector('#sign-up-button')
signUpBox.appendChild(signUpForm())
const cancelButton = document.querySelector('.cancel-button')

window.onclick = function (event) {
  if (event.target === signUpBox || event.target === cancelButton) {
    signUpBox.style.display = 'none'
  }
  if (event.target === signUpButton) {
    signUpBox.style.display = 'block'
  }
}
